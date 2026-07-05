#!/usr/bin/env bash
set -e

TARGET_DIR="/opt/bg-apiary/backend"
ENV_FILE="$TARGET_DIR/.env"

echo "=== BG Apiary ENV installer ==="

if [ ! -d "$TARGET_DIR" ]; then
  echo "ERROR: backend directory not found: $TARGET_DIR"
  echo "Run this on VPS after pulling the project to /opt/bg-apiary."
  exit 1
fi

cat > "$ENV_FILE" <<'EOF'
# BG Apiary backend environment
NODE_ENV=development
PORT=3000

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bg_apiary"

JWT_SECRET="change-this-before-production-bg-apiary"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

CORS_ORIGIN="https://bgapiary.pro,http://localhost:5173"
EOF

chmod 600 "$ENV_FILE"

echo "Created: $ENV_FILE"
echo
echo "Current .env:"
cat "$ENV_FILE"
echo
echo "Now run:"
echo "cd /opt/bg-apiary/backend"
echo "npx prisma validate"
