#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/bg-apiary"
BACKEND_DIR="$APP_DIR/backend"

echo "=== BG Apiary Check v3.0 ==="

echo "--- Git ---"
cd "$APP_DIR"
git status --short || true
git log -1 --oneline || true

echo "--- Docker ---"
docker ps -a || true

echo "--- Frontend files ---"
ls -la /var/www/html | head -30 || true

echo "--- Backend build ---"
cd "$BACKEND_DIR"
npm run build || true

echo "--- Prisma ---"
npx prisma validate || true

echo "--- Health ---"
curl -i http://localhost:3000/api/v1/health || true
curl -i http://localhost || true
