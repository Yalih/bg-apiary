#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/opt/bg-apiary}"
cd "$APP_DIR"

echo "[1/6] Fetch git"
git fetch origin main

echo "[2/6] Reset to origin/main"
git reset --hard origin/main

echo "[3/6] Build images"
DOCKER_BUILDKIT=1 docker compose build --pull

echo "[4/6] Restart stack"
docker compose up -d

echo "[5/6] Health check"
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

echo "[6/6] Done"
bash scripts/check.sh
