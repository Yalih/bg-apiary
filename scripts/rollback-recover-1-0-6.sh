#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/opt/bg-apiary}"
cd "$APP_DIR"

echo "BG Apiary rollback/recover - last working 1.0.6"
echo "This keeps .env and database volume. It only restarts app containers and Nginx."

echo "[1/6] Stop broken app containers"
docker rm -f bg-apiary-web bg-apiary-api bg-apiary-pgadmin 2>/dev/null || true
docker network rm bg-apiary_default 2>/dev/null || true

echo "[2/6] Start PostgreSQL and API"
docker compose up -d postgres api

echo "[3/6] Wait for direct API health"
for i in {1..90}; do
  if curl -fsS http://127.0.0.1:4000/api/v1/health >/dev/null 2>&1; then
    echo "API direct health OK"
    break
  fi
  if [ "$i" = "90" ]; then
    echo "API did not become healthy. Recent logs:"
    docker logs bg-apiary-api --tail=180 || true
    exit 1
  fi
  sleep 2
done

echo "[4/6] Configure Nginx"
bash scripts/install-nginx-host.sh

echo "[5/6] Rebuild and publish frontend"
cd "$APP_DIR/frontend"
rm -rf node_modules package-lock.json tsconfig.tsbuildinfo
npm install --include=dev --no-audit --no-fund --prefer-online --fetch-timeout=300000 --fetch-retries=5
npm run build
sudo rm -rf /var/www/html/*
sudo cp -a dist/. /var/www/html/
sudo chown -R www-data:www-data /var/www/html || true
cd "$APP_DIR"

echo "[6/6] Doctor"
bash scripts/check.sh

echo "Rollback/recover finished."
