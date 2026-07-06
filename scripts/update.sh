#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/opt/bg-apiary}"
cd "$APP_DIR"

if [ -f .env ]; then
  if grep -q "^APP_VERSION=" .env; then
    sed -i "s/^APP_VERSION=.*/APP_VERSION=1.1.0/" .env
  else
    echo "APP_VERSION=1.1.0" >> .env
  fi
fi

echo "[1/8] Fetch git"
git fetch origin main

echo "[2/8] Reset to origin/main"
git reset --hard origin/main

echo "[3/8] Stop old app containers"
docker compose down --remove-orphans || true
docker rm -f bg-apiary-web bg-apiary-api 2>/dev/null || true
docker network rm bg-apiary_default 2>/dev/null || true

echo "[4/8] Build API"
DOCKER_BUILDKIT=1 docker compose build --pull --no-cache api

echo "[5/8] Restart database and API"
docker compose up -d postgres api

echo "[6/8] Build and publish frontend"
cd frontend
rm -rf node_modules package-lock.json tsconfig.tsbuildinfo
npm install --include=dev --no-audit --no-fund --prefer-online --fetch-timeout=300000 --fetch-retries=5
npm run build
sudo rm -rf /var/www/html/*
sudo cp -a dist/. /var/www/html/
sudo chown -R www-data:www-data /var/www/html || true
cd "$APP_DIR"

if [ -f .env ]; then
  if grep -q "^APP_VERSION=" .env; then
    sed -i "s/^APP_VERSION=.*/APP_VERSION=1.1.0/" .env
  else
    echo "APP_VERSION=1.1.0" >> .env
  fi
fi

echo "[7/8] Configure nginx"
bash scripts/install-nginx-host.sh

POST_CODE="$(curl -s -o /tmp/bgapiary-post-check.txt -w "%{http_code}" -X POST http://127.0.0.1/api/v1/auth/login -H "Content-Type: application/json" -d '{"email":"missing-user@bgapiary.local","password":"x"}' || true)"
if [ "$POST_CODE" = "405" ]; then
  echo "ERROR: Nginx returns 405 for API POST. Login/register will not work." >&2
  sudo nginx -T | grep -n "location .*api" -A12 -B4 || true
  exit 1
fi
echo "POST /api proxy HTTP $POST_CODE"

echo "[8/8] Health check"
for i in {1..60}; do
  if curl -fsS http://127.0.0.1/api/v1/health >/dev/null 2>&1; then
    echo "OK"
    break
  fi
  sleep 2
  if [ "$i" = "60" ]; then
    docker logs bg-apiary-api --tail=120 || true
    exit 1
  fi
done

bash scripts/check.sh
