#!/usr/bin/env bash
set -euo pipefail
cd /opt/bg-apiary/backend

ACCESS_SECRET="$(openssl rand -hex 32 2>/dev/null || date +%s%N | sha256sum | awk '{print $1}')"
REFRESH_SECRET="$(openssl rand -hex 32 2>/dev/null || date +%s%N | sha256sum | awk '{print $1}')"

cat > .env <<ENV
NODE_ENV=production
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/bg_apiary?schema=public"
JWT_ACCESS_SECRET="$ACCESS_SECRET"
JWT_REFRESH_SECRET="$REFRESH_SECRET"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="30d"
CORS_ORIGIN="https://bgapiary.pro"
LOG_LEVEL="info"
ENV
chmod 600 .env
echo "Created backend/.env for BG Apiary 1.0 PRO"
