#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/bg-apiary"
BACKEND_DIR="$APP_DIR/backend"
ENV_FILE="$BACKEND_DIR/.env"
NGINX_SITE="/etc/nginx/sites-available/bg-apiary"

GREEN="\033[0;32m"; YELLOW="\033[1;33m"; RED="\033[0;31m"; NC="\033[0m"
log(){ echo -e "${GREEN}[BG Apiary PRO]${NC} $1"; }
warn(){ echo -e "${YELLOW}[BG Apiary PRO WARNING]${NC} $1"; }
fail(){ echo -e "${RED}[BG Apiary PRO ERROR]${NC} $1"; exit 1; }
require_cmd(){ command -v "$1" >/dev/null 2>&1 || fail "Missing command: $1"; }
secret(){ if command -v openssl >/dev/null 2>&1; then openssl rand -hex 32; else date +%s%N | sha256sum | awk '{print $1}'; fi; }
install_deps(){ if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi; }
wait_url(){ local url="$1"; local name="$2"; for i in {1..40}; do if curl -fsS "$url" >/dev/null 2>&1; then log "$name OK"; return 0; fi; sleep 2; done; fail "$name did not respond: $url"; }

cat <<'BANNER'
======================================
 BG Apiary 1.0 PRO production installer
======================================
BANNER

log "1/16 Checking tools"
require_cmd git; require_cmd node; require_cmd npm; require_cmd docker; require_cmd curl; require_cmd sudo
if ! docker compose version >/dev/null 2>&1; then fail "Docker Compose plugin is missing"; fi
[ -d "$APP_DIR/.git" ] || fail "$APP_DIR is not a git repository"

log "2/16 Preserving backend .env"
TMP_ENV=""
if [ -f "$ENV_FILE" ]; then TMP_ENV="/tmp/bg-apiary.env.$(date +%s)"; cp "$ENV_FILE" "$TMP_ENV"; fi

log "3/16 Syncing VPS with GitHub main"
cd "$APP_DIR"
git fetch origin main
git reset --hard origin/main
git clean -fd -e backend/.env -e 'backend/.env.backup.*'

log "4/16 Preparing production .env"
mkdir -p "$BACKEND_DIR"
if [ -n "$TMP_ENV" ] && [ -f "$TMP_ENV" ] && grep -q "JWT_ACCESS_SECRET" "$TMP_ENV" && grep -q "JWT_REFRESH_SECRET" "$TMP_ENV"; then
  cp "$TMP_ENV" "$ENV_FILE"
  log "Restored existing backend .env"
else
  ACCESS_SECRET="$(secret)"
  REFRESH_SECRET="$(secret)"
  PGADMIN_PASSWORD="$(secret)"
  cat > "$ENV_FILE" <<ENV
NODE_ENV=production
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/bg_apiary?schema=public"
JWT_ACCESS_SECRET="$ACCESS_SECRET"
JWT_REFRESH_SECRET="$REFRESH_SECRET"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="30d"
CORS_ORIGIN="https://bgapiary.pro"
LOG_LEVEL="info"
PGADMIN_DEFAULT_EMAIL="admin@bgapiary.pro"
PGADMIN_DEFAULT_PASSWORD="$PGADMIN_PASSWORD"
ENV
  chmod 600 "$ENV_FILE"
  log "Created new backend .env"
fi

log "5/16 Finding Docker Compose"
COMPOSE_FILE="$APP_DIR/docker-compose.yml"
[ -f "$COMPOSE_FILE" ] || fail "Missing $COMPOSE_FILE"
log "Using $COMPOSE_FILE"

log "6/16 Stopping old containers"
docker compose -f "$COMPOSE_FILE" down --remove-orphans || true
docker rm -f bg-apiary-postgres bg-apiary-backend bg-apiary-pgadmin 2>/dev/null || true

log "7/16 Installing frontend dependencies"
cd "$APP_DIR"
rm -rf node_modules
install_deps

log "8/16 Building frontend"
export VITE_API_URL=""
npm run build
test -d "$APP_DIR/dist" || fail "Frontend dist was not created"

log "9/16 Installing backend dependencies"
cd "$BACKEND_DIR"
rm -rf node_modules
install_deps

log "10/16 Validating and building backend"
npx prisma validate
npm run build

log "11/16 Starting Docker services"
cd "$APP_DIR"
docker compose -f "$COMPOSE_FILE" up -d --build

log "12/16 Waiting for backend"
wait_url "http://127.0.0.1:3000/api/v1/health" "Backend health"

log "13/16 Installing Nginx site"
sudo tee "$NGINX_SITE" >/dev/null <<'NGINX'
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name bgapiary.pro www.bgapiary.pro _;

  root /var/www/html;
  index index.html;

  location /api/ {
    proxy_pass http://127.0.0.1:3000/api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location / {
    try_files $uri $uri/ /index.html;
  }
}
NGINX
sudo ln -sf "$NGINX_SITE" /etc/nginx/sites-enabled/bg-apiary
sudo rm -f /etc/nginx/sites-enabled/default

log "14/16 Publishing frontend"
sudo mkdir -p /var/www/html
sudo rm -rf /var/www/html/*
sudo cp -r "$APP_DIR/dist/"* /var/www/html/
sudo chown -R www-data:www-data /var/www/html
sudo nginx -t
sudo systemctl reload nginx

log "15/16 Final checks"
wait_url "http://127.0.0.1:3000/api/v1/health" "Backend direct"
wait_url "http://127.0.0.1/api/v1/health" "Backend through Nginx"
wait_url "http://127.0.0.1" "Frontend through Nginx"

log "16/16 Status"
docker compose -f "$COMPOSE_FILE" ps

cat <<'DONE'
======================================
 BG Apiary 1.0 PRO is ready
======================================
Frontend: https://bgapiary.pro
API:      https://bgapiary.pro/api/v1/health
Local:    curl http://127.0.0.1/api/v1/health
Doctor:   bash scripts/check.sh
DONE
