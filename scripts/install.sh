#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/opt/bg-apiary}"
COMPOSE="docker compose"
STEP=0
TOTAL=13

log() { echo -e "\n[$((++STEP))/$TOTAL] $*"; }
fail() { echo "ERROR: $*" >&2; exit 1; }
need() { command -v "$1" >/dev/null 2>&1 || fail "Brakuje polecenia: $1"; }

cd "$APP_DIR" || fail "Nie mogę wejść do $APP_DIR"

log "Checking required tools"
need git
need curl
if ! command -v docker >/dev/null 2>&1; then
  fail "Docker nie jest zainstalowany. Zainstaluj Docker albo uruchom scripts/install-docker-ubuntu.sh"
fi
if ! docker compose version >/dev/null 2>&1; then
  fail "Docker Compose nie działa"
fi

log "Checking ports"
if ss -ltn | awk '{print $4}' | grep -qE '(:80)$'; then
  if ! docker ps --format '{{.Names}}' | grep -q '^bg-apiary-web$'; then
    echo "UWAGA: port 80 jest już zajęty. Jeśli to stary nginx, zatrzymaj go albo zmień konfigurację." >&2
  fi
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

log "Stopping old containers"
$COMPOSE down --remove-orphans || true

docker rm -f bg-apiary-web bg-apiary-api bg-apiary-postgres bg-apiary-pgadmin >/dev/null 2>&1 || true

log "Cleaning Docker builder cache for app images"
docker builder prune -f >/dev/null 2>&1 || true

log "Building images with public npm registry"
DOCKER_BUILDKIT=1 $COMPOSE build --pull --no-cache

log "Starting database and API"
$COMPOSE up -d postgres api

log "Waiting for API health"
for i in {1..60}; do
  if curl -fsS http://127.0.0.1:4000/api/v1/health >/dev/null 2>&1; then
    echo "API is healthy"
    break
  fi
  if [ "$i" = "60" ]; then
    echo "API logs:" >&2
    docker logs bg-apiary-api --tail=120 >&2 || true
    fail "API nie odpowiada na /api/v1/health"
  fi
  sleep 2
done

log "Starting web"
$COMPOSE up -d web

log "Checking frontend"
for i in {1..40}; do
  if curl -fsS http://127.0.0.1/ >/dev/null 2>&1; then
    echo "Frontend is responding"
    break
  fi
  if [ "$i" = "40" ]; then
    docker logs bg-apiary-web --tail=120 >&2 || true
    fail "Frontend nie odpowiada"
  fi
  sleep 2
done

log "Final diagnostics"
bash scripts/check.sh || true

log "BG Apiary 1.0 Production ready"
echo "Frontend: http://SERVER_IP/"
echo "API:      http://SERVER_IP/api/v1/health"
echo "Swagger:  http://SERVER_IP/api/docs"
