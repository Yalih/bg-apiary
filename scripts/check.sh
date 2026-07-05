#!/usr/bin/env bash
set -euo pipefail
APP_DIR="/opt/bg-apiary"
COMPOSE_FILE="$APP_DIR/docker-compose.yml"

echo "=== BG Apiary 1.0 PRO doctor ==="
echo "--- Git ---"
cd "$APP_DIR" && git log -1 --oneline && git status --short || true

echo "--- Docker compose ---"
docker compose -f "$COMPOSE_FILE" ps || true

echo "--- Backend logs ---"
docker logs bg-apiary-backend --tail 80 || true

echo "--- API direct ---"
curl -i http://127.0.0.1:3000/api/v1/health || true

echo "--- API through Nginx ---"
curl -i http://127.0.0.1/api/v1/health || true

echo "--- Frontend ---"
curl -I http://127.0.0.1 || true

echo "--- Prisma ---"
cd "$APP_DIR/backend" && npx prisma validate || true
