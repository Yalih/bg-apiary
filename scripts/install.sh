#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/bg-apiary"
BACKEND_DIR="$APP_DIR/backend"
ENV_FILE="$BACKEND_DIR/.env"

GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
NC="\033[0m"

log() { echo -e "${GREEN}[BG Apiary]${NC} $1"; }
warn() { echo -e "${YELLOW}[BG Apiary WARNING]${NC} $1"; }
fail() { echo -e "${RED}[BG Apiary ERROR]${NC} $1"; exit 1; }

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "Missing command: $1"
}

run_step() {
  log "$1"
}

wait_for_postgres() {
  local compose_file="$1"
  log "Waiting for PostgreSQL health..."
  for i in {1..30}; do
    if docker compose -f "$compose_file" ps | grep -E "postgres|db" | grep -q "healthy"; then
      log "PostgreSQL is healthy."
      return 0
    fi
    sleep 2
  done

  warn "PostgreSQL health status was not detected. Trying Prisma anyway."
}

echo "======================================"
echo " BG Apiary Installer v3.0"
echo "======================================"

run_step "1/15 Checking required tools"
require_cmd git
require_cmd node
require_cmd npm
require_cmd docker
docker compose version >/dev/null 2>&1 || fail "Docker Compose plugin is missing."

[ -d "$APP_DIR/.git" ] || fail "$APP_DIR is not a git repository."

run_step "2/15 Resetting VPS copy to GitHub main"
cd "$APP_DIR"
git fetch origin main
git reset --hard origin/main
git clean -fd

run_step "3/15 Preparing backend .env"
mkdir -p "$BACKEND_DIR"

if [ -f "$ENV_FILE" ]; then
  cp "$ENV_FILE" "$ENV_FILE.backup.$(date +%Y%m%d%H%M%S)"
  log "Existing .env backup created."
else
  cat > "$ENV_FILE" <<'EOF'
NODE_ENV=development
PORT=3000

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bg_apiary"

JWT_SECRET="change-this-before-production-bg-apiary"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

CORS_ORIGIN="https://bgapiary.pro,http://localhost:5173"
EOF
  chmod 600 "$ENV_FILE"
  log "Created backend/.env"
fi

run_step "4/15 Locating Docker Compose file"
COMPOSE_FILE=""
if [ -f "$APP_DIR/docker-compose.yml" ]; then
  COMPOSE_FILE="$APP_DIR/docker-compose.yml"
elif [ -f "$BACKEND_DIR/docker/docker-compose.yml" ]; then
  COMPOSE_FILE="$BACKEND_DIR/docker/docker-compose.yml"
else
  fail "docker-compose.yml not found."
fi
log "Using compose file: $COMPOSE_FILE"

run_step "5/15 Stopping previous Docker containers"
docker compose -f "$COMPOSE_FILE" down --remove-orphans || true

# Safety cleanup for older hardcoded container names, because Docker loves keeping ghosts around.
docker rm -f bg-apiary-postgres bg-apiary-backend bg-apiary-pgadmin 2>/dev/null || true

run_step "6/15 Cleaning frontend dependencies"
cd "$APP_DIR"
rm -rf node_modules
rm -f package-lock.json

run_step "7/15 Installing frontend dependencies"
npm install --no-audit --no-fund

run_step "8/15 Building frontend"
npm run build
test -d "$APP_DIR/dist" || fail "Frontend dist directory was not created."

run_step "9/15 Cleaning backend dependencies"
cd "$BACKEND_DIR"
rm -rf node_modules
rm -f package-lock.json

run_step "10/15 Installing backend dependencies"
npm install --no-audit --no-fund

run_step "11/15 Building backend"
npm run build

run_step "12/15 Starting Docker services"
docker compose -f "$COMPOSE_FILE" up -d --build
wait_for_postgres "$COMPOSE_FILE"

run_step "13/15 Running Prisma"
cd "$BACKEND_DIR"
npx prisma validate
npx prisma generate
if npx prisma migrate deploy; then
  log "Prisma migrate deploy completed."
else
  warn "migrate deploy failed or no migrations applied. Trying migrate dev init."
  npx prisma migrate dev --name init
fi

run_step "14/15 Publishing frontend to Nginx"
sudo mkdir -p /var/www/html
sudo rm -rf /var/www/html/*
sudo cp -r "$APP_DIR/dist/"* /var/www/html/
sudo chown -R www-data:www-data /var/www/html

sudo nginx -t
sudo systemctl reload nginx

run_step "15/15 Health checks"
docker compose -f "$COMPOSE_FILE" ps || true
curl -fsS http://localhost:3000/api/v1/health || warn "Backend health endpoint did not respond on localhost:3000."
curl -fsS http://localhost >/dev/null || warn "Frontend localhost check failed."

echo "======================================"
echo " BG Apiary Installer v3.0 finished"
echo "======================================"
echo "Frontend: https://bgapiary.pro"
echo "Backend:  http://localhost:3000/api/v1/health"
