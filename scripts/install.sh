#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="/opt/bg-apiary"
BACKEND_DIR="$APP_DIR/backend"
ENV_FILE="$BACKEND_DIR/.env"
ROOT_ENV_FILE="$APP_DIR/.env"
NGINX_SITE="/etc/nginx/sites-available/bg-apiary"
NPM_CACHE_DIR="$APP_DIR/.npm-cache"

GREEN="\033[0;32m"; YELLOW="\033[1;33m"; RED="\033[0;31m"; NC="\033[0m"
log(){ echo -e "${GREEN}[BG Apiary PRO]${NC} $1"; }
warn(){ echo -e "${YELLOW}[BG Apiary PRO WARNING]${NC} $1"; }
fail(){ echo -e "${RED}[BG Apiary PRO ERROR]${NC} $1"; exit 1; }
require_cmd(){ command -v "$1" >/dev/null 2>&1 || fail "Missing command: $1"; }
secret(){ if command -v openssl >/dev/null 2>&1; then openssl rand -hex 32; else date +%s%N | sha256sum | awk '{print $1}'; fi; }

run_step(){
  local name="$1"; shift
  log "$name"
  "$@"
}

npm_clean_permissions(){
  mkdir -p "$NPM_CACHE_DIR"
  chown -R "$(id -u):$(id -g)" "$NPM_CACHE_DIR" 2>/dev/null || true
  chown -R "$(id -u):$(id -g)" "$APP_DIR/node_modules" "$BACKEND_DIR/node_modules" "$HOME/.npm" 2>/dev/null || true
}

install_node_deps(){
  local dir="$1"
  local label="$2"
  local log_file="/tmp/bg-apiary-${label}-npm.log"

  cd "$dir"
  rm -rf node_modules
  npm_clean_permissions

  export npm_config_audit=false
  export npm_config_fund=false
  export npm_config_progress=true
  export npm_config_fetch_retries=5
  export npm_config_fetch_retry_mintimeout=20000
  export npm_config_fetch_retry_maxtimeout=120000
  export npm_config_fetch_timeout=300000
  export npm_config_cache="$NPM_CACHE_DIR"
  export npm_config_update_notifier=false

  log "Installing $label dependencies. Log: $log_file"
  if [ "$label" = "backend" ]; then
    export PRISMA_SKIP_POSTINSTALL_GENERATE=true
  else
    unset PRISMA_SKIP_POSTINSTALL_GENERATE 2>/dev/null || true
  fi
  if [ -f package-lock.json ]; then
    timeout 25m npm ci --no-audit --no-fund --prefer-offline --loglevel=notice 2>&1 | tee "$log_file"
  else
    timeout 25m npm install --no-audit --no-fund --prefer-offline --loglevel=notice 2>&1 | tee "$log_file"
  fi
}

wait_url(){
  local url="$1"; local name="$2"
  for i in {1..45}; do
    if curl -fsS "$url" >/dev/null 2>&1; then log "$name OK"; return 0; fi
    sleep 2
  done
  warn "$name did not respond: $url"
  docker compose -f "$APP_DIR/docker-compose.yml" ps || true
  docker logs bg-apiary-backend --tail 120 || true
  fail "$name did not respond: $url"
}

write_env(){
  local access refresh pgadmin_pass
  access="$(secret)"
  refresh="$(secret)"
  pgadmin_pass="$(secret)"

  cat > "$ENV_FILE" <<ENV
NODE_ENV=production
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/bg_apiary?schema=public"
JWT_ACCESS_SECRET="$access"
JWT_REFRESH_SECRET="$refresh"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="30d"
CORS_ORIGIN="https://bgapiary.pro,http://bgapiary.pro,http://127.0.0.1"
LOG_LEVEL="info"
PGADMIN_DEFAULT_EMAIL="admin@bgapiary.pro"
PGADMIN_DEFAULT_PASSWORD="$pgadmin_pass"
ENV
  chmod 600 "$ENV_FILE"
  cp "$ENV_FILE" "$ROOT_ENV_FILE"
  chmod 600 "$ROOT_ENV_FILE"
}

cat <<'BANNER'
=========================================
 BG Apiary 1.0.1 PRO production installer
=========================================
BANNER

run_step "1/16 Checking tools" require_cmd git
require_cmd node; require_cmd npm; require_cmd docker; require_cmd curl; require_cmd sudo; require_cmd timeout
if ! docker compose version >/dev/null 2>&1; then fail "Docker Compose plugin is missing"; fi
[ -d "$APP_DIR/.git" ] || fail "$APP_DIR is not a git repository"

log "2/16 Preserving existing env files"
TMP_ENV=""
if [ -f "$ENV_FILE" ]; then TMP_ENV="/tmp/bg-apiary-backend.env.$(date +%s)"; cp "$ENV_FILE" "$TMP_ENV"; fi

log "3/16 Syncing VPS with GitHub main"
cd "$APP_DIR"
git fetch origin main
git reset --hard origin/main
git clean -fd -e .env -e backend/.env -e '.npm-cache/**' -e 'backend/.env.backup.*'

log "4/16 Preparing production env files"
mkdir -p "$BACKEND_DIR"
if [ -n "$TMP_ENV" ] && [ -f "$TMP_ENV" ] && grep -q "JWT_ACCESS_SECRET" "$TMP_ENV" && grep -q "JWT_REFRESH_SECRET" "$TMP_ENV"; then
  cp "$TMP_ENV" "$ENV_FILE"
  cp "$ENV_FILE" "$ROOT_ENV_FILE"
  chmod 600 "$ENV_FILE" "$ROOT_ENV_FILE"
  log "Restored existing backend/root env"
else
  write_env
  log "Created new backend/root env"
fi

log "5/16 Finding Docker Compose"
COMPOSE_FILE="$APP_DIR/docker-compose.yml"
[ -f "$COMPOSE_FILE" ] || fail "Missing $COMPOSE_FILE"
log "Using $COMPOSE_FILE"

log "6/16 Stopping old containers"
docker compose -f "$COMPOSE_FILE" down --remove-orphans || true
docker rm -f bg-apiary-postgres bg-apiary-backend bg-apiary-pgadmin 2>/dev/null || true

log "7/16 Installing frontend dependencies"
install_node_deps "$APP_DIR" "frontend"

log "8/16 Building frontend"
cd "$APP_DIR"
export VITE_API_URL=""
npm run build
test -d "$APP_DIR/dist" || fail "Frontend dist was not created"

log "9/16 Installing backend dependencies"
install_node_deps "$BACKEND_DIR" "backend"

log "10/16 Validating and building backend"
cd "$BACKEND_DIR"
npx prisma validate
npx prisma generate
npm run build

log "11/16 Starting Docker services"
cd "$APP_DIR"
docker compose -f "$COMPOSE_FILE" --env-file "$ROOT_ENV_FILE" up -d --build

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

  client_max_body_size 20M;

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
docker compose -f "$COMPOSE_FILE" --env-file "$ROOT_ENV_FILE" ps

cat <<'DONE'
=========================================
 BG Apiary 1.0.1 PRO is ready
=========================================
Frontend: https://bgapiary.pro
API:      https://bgapiary.pro/api/v1/health
Local:    curl http://127.0.0.1/api/v1/health
Doctor:   bash scripts/check.sh
NPM logs: /tmp/bg-apiary-frontend-npm.log and /tmp/bg-apiary-backend-npm.log
DONE
