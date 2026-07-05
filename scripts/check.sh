#!/usr/bin/env bash
set -euo pipefail

echo "=== BG Apiary health check ==="

echo "--- Docker ---"
docker ps || true

echo "--- Frontend files ---"
ls -la /var/www/html | head || true

echo "--- Backend health ---"
curl -i http://localhost:3000/api/v1/health || true

echo "--- Prisma validate ---"
cd /opt/bg-apiary/backend
npx prisma validate || true
