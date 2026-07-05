#!/usr/bin/env bash
set -euo pipefail
APP_DIR="/opt/bg-apiary"
COMPOSE_FILE="$APP_DIR/docker-compose.yml"
ENV_FILE="$APP_DIR/.env"

ok(){ printf "\033[0;32mOK\033[0m %s\n" "$1"; }
warn(){ printf "\033[1;33mWARN\033[0m %s\n" "$1"; }

cd "$APP_DIR"
echo "=== BG Apiary 1.0.1 PRO doctor ==="

echo "--- Git ---"
git log -1 --oneline || true
git status --short || true

echo "--- Files ---"
[ -f "$COMPOSE_FILE" ] && ok "docker-compose.yml exists" || warn "missing docker-compose.yml"
[ -f "$APP_DIR/backend/.env" ] && ok "backend/.env exists" || warn "missing backend/.env"
[ -f "$ENV_FILE" ] && ok "root .env exists" || warn "missing root .env"

echo "--- Docker compose ---"
docker compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" ps || docker compose -f "$COMPOSE_FILE" ps || true

echo "--- Backend logs ---"
docker logs bg-apiary-backend --tail 120 || true

echo "--- Postgres logs ---"
docker logs bg-apiary-postgres --tail 40 || true

echo "--- API direct ---"
curl -i --max-time 10 http://127.0.0.1:3000/api/v1/health || true

echo "--- API through Nginx ---"
curl -i --max-time 10 http://127.0.0.1/api/v1/health || true

echo "--- Frontend ---"
curl -I --max-time 10 http://127.0.0.1 || true

echo "--- NPM install logs ---"
ls -lh /tmp/bg-apiary-*-npm.log 2>/dev/null || true
tail -40 /tmp/bg-apiary-frontend-npm.log 2>/dev/null || true

echo "--- Prisma ---"
cd "$APP_DIR/backend" && npx prisma validate || true
