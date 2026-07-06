#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/opt/bg-apiary}"
cd "$APP_DIR"

echo "BG Apiary 1.0.6 - fixing Nginx API proxy only"

echo "[1/4] Ensure API is running"
if ! curl -fsS http://127.0.0.1:4000/api/v1/health >/tmp/bgapiary-api-direct.json; then
  echo "API direct health failed. Starting Docker API/Postgres..."
  docker rm -f bg-apiary-api bg-apiary-web 2>/dev/null || true
  docker compose up -d postgres api
fi

echo "[2/4] Reinstall host Nginx config"
bash scripts/install-nginx-host.sh

echo "[3/4] Test POST via local Nginx"
curl -i -X POST http://127.0.0.1/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"missing-user@bgapiary.local","password":"x"}' | tee /tmp/bgapiary-post-local.txt

if grep -q "405" /tmp/bgapiary-post-local.txt; then
  echo "ERROR: local Nginx still returns 405." >&2
  exit 1
fi

echo "[4/4] Doctor"
bash scripts/check.sh || true

echo "Done. If browser still shows 405, clear PWA/cache or open incognito."
