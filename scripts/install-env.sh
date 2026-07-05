#!/usr/bin/env bash
set -e

cd /opt/bg-apiary/backend

cat > .env <<'EOF'
NODE_ENV=development
PORT=3000

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bg_apiary"

JWT_SECRET="change-this-before-production-bg-apiary"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

CORS_ORIGIN="https://bgapiary.pro,http://localhost:5173"
EOF

chmod 600 .env

echo "Created backend/.env"
cat .env
