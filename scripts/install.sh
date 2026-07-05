#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/opt/bg-apiary}"
COMPOSE="docker compose"
STEP=0
TOTAL=15
WEB_ROOT="${WEB_ROOT:-/var/www/html}"

log() { echo -e "\n[$((++STEP))/$TOTAL] $*"; }
fail() { echo "ERROR: $*" >&2; exit 1; }
need() { command -v "$1" >/dev/null 2>&1 || fail "Brakuje polecenia: $1"; }

cd "$APP_DIR" || fail "Nie mogę wejść do $APP_DIR"

log "Checking required tools"
need git
need curl
need docker
need node
need npm
if ! docker compose version >/dev/null 2>&1; then
  fail "Docker Compose nie działa"
fi

log "Preparing .env"
if [ ! -f .env ]; then
  DB_PASSWORD="$(openssl rand -base64 32 | tr -d '=+/ ' | cut -c1-32)"
  JWT_SECRET="$(openssl rand -base64 64 | tr -d '\n')"
  PGADMIN_PASSWORD="$(openssl rand -base64 24 | tr -d '=+/ ' | cut -c1-24)"
  cp .env.example .env
  sed -i "s/change-this-db-password/${DB_PASSWORD}/g" .env
  sed -i "s/change-this-to-a-long-random-secret-before-production/${JWT_SECRET}/g" .env
  sed -i "s/change-this-pgadmin-password/${PGADMIN_PASSWORD}/g" .env
fi

log "Syncing git repository"
git fetch origin main || true
CURRENT_BRANCH="$(git branch --show-current || echo main)"
if [ "$CURRENT_BRANCH" = "main" ]; then
  git reset --hard origin/main || true
fi

log "Stopping old Docker containers"
$COMPOSE down --remove-orphans || true
docker rm -f bg-apiary-web bg-apiary-api bg-apiary-postgres bg-apiary-pgadmin >/dev/null 2>&1 || true
docker network rm bg-apiary_default >/dev/null 2>&1 || true

log "Building API image"
DOCKER_BUILDKIT=1 $COMPOSE build --pull --no-cache api

log "Starting PostgreSQL and API"
$COMPOSE up -d postgres api

log "Waiting for API health"
for i in {1..90}; do
  if curl -fsS http://127.0.0.1:4000/api/v1/health >/dev/null 2>&1; then
    echo "API is healthy"
    break
  fi
  if [ "$i" = "90" ]; then
    echo "API logs:" >&2
    docker logs bg-apiary-api --tail=160 >&2 || true
    fail "API nie odpowiada na /api/v1/health"
  fi
  sleep 2
done

log "Installing frontend dependencies"
cd "$APP_DIR/frontend"
rm -rf node_modules package-lock.json tsconfig.tsbuildinfo
npm cache clean --force >/dev/null 2>&1 || true
npm install --include=dev --no-audit --no-fund --prefer-online --fetch-timeout=300000 --fetch-retries=5

log "Building frontend"
npm run build
test -f dist/index.html || fail "Brakuje frontend/dist/index.html po buildzie"

log "Publishing frontend to host Nginx"
sudo mkdir -p "$WEB_ROOT"
sudo rm -rf "$WEB_ROOT"/*
sudo cp -a "$APP_DIR/frontend/dist/." "$WEB_ROOT/"
sudo chown -R www-data:www-data "$WEB_ROOT" || true
cd "$APP_DIR"

log "Configuring host Nginx"
bash scripts/install-nginx-host.sh

log "Checking API through Nginx"
for i in {1..30}; do
  if curl -fsS http://127.0.0.1/api/v1/health >/dev/null 2>&1; then
    echo "API proxy is healthy"
    break
  fi
  if [ "$i" = "30" ]; then
    sudo nginx -T | grep -n "location .*api" -A8 -B3 || true
    fail "Nginx nie przekierowuje /api do backendu"
  fi
  sleep 1
done

log "Checking API POST through Nginx"
POST_CODE="$(curl -s -o /tmp/bgapiary-post-check.txt -w "%{http_code}" \
  -X POST http://127.0.0.1/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"missing-user@bgapiary.local","password":"x"}' || true)"
if [ "$POST_CODE" = "405" ]; then
  sudo nginx -T | grep -n "location .*api" -A12 -B4 || true
  fail "Nginx zwraca HTTP 405 dla POST /api. To blokuje logowanie i rejestrację."
fi
echo "POST /api proxy returned HTTP $POST_CODE"

log "Checking frontend through Nginx"
curl -fsSI http://127.0.0.1/ >/dev/null || fail "Frontend nie odpowiada przez Nginx"

log "Final diagnostics"
bash scripts/check.sh || true

log "BG Apiary 1.0.5 Production ready"
echo "Frontend: http://SERVER_IP/"
echo "API:      http://SERVER_IP/api/v1/health"
echo "Swagger:  http://SERVER_IP/api/docs"
