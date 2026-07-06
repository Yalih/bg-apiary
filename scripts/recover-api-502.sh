#!/usr/bin/env bash
set -Eeuo pipefail

cd "${APP_DIR:-/opt/bg-apiary}"

echo "BG Apiary recovery: restart API/PostgreSQL and fix Nginx proxy"

docker rm -f bg-apiary-api bg-apiary-web 2>/dev/null || true
docker compose up -d postgres api

for i in {1..90}; do
  if curl -fsS http://127.0.0.1:4000/api/v1/health >/dev/null 2>&1; then
    echo "API direct health OK"
    break
  fi
  if [ "$i" = "90" ]; then
    docker logs bg-apiary-api --tail=160 || true
    exit 1
  fi
  sleep 2
done

bash scripts/install-nginx-host.sh
bash scripts/check.sh
