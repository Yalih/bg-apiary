#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/bg-apiary"
BACKEND_DIR="$APP_DIR/backend"
ENV_FILE="$BACKEND_DIR/.env"

echo "======================================"
echo " BG Apiary Installer v2.0"
echo "======================================"

fail() {
  echo "ERROR: $1"
  exit 1
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "Missing command: $1"
}

echo "[1/12] Checking required tools..."
require_cmd git
require_cmd node
require_cmd npm
require_cmd docker

docker compose version >/dev/null 2>&1 || fail "Docker Compose plugin is missing."

if [ ! -d "$APP_DIR/.git" ]; then
  fail "$APP_DIR is not a git repository. Clone repo first: cd /opt && git clone https://github.com/Yalih/bg-apiary.git"
fi

echo "[2/12] Resetting VPS copy to GitHub main..."
cd "$APP_DIR"
git fetch origin main
git reset --hard origin/main
git clean -fd

echo "[3/12] Creating backend .env if missing..."
mkdir -p "$BACKEND_DIR"

if [ ! -f "$ENV_FILE" ]; then
  cat > "$ENV_FILE" <<'EOF'
NODE_ENV=development
PORT=3000

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bg_apiary"

JWT_SECRET="change-this-before-production-bg-apiary"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

CORS_ORIGIN="https://bgapiary.pro,http://localhost:5173"
EOF
  chmod 600 "$ENV_FILE"
fi

echo "[4/12] Cleaning frontend dependencies..."
cd "$APP_DIR"
rm -rf node_modules
rm -f package-lock.json

echo "[5/12] Installing frontend dependencies..."
npm install --no-audit --no-fund

echo "[6/12] Building frontend..."
npm run build
test -d "$APP_DIR/dist" || fail "Frontend dist directory was not created."

echo "[7/12] Cleaning backend dependencies..."
cd "$BACKEND_DIR"
rm -rf node_modules
rm -f package-lock.json

echo "[8/12] Installing backend dependencies..."
npm install --no-audit --no-fund

echo "[9/12] Building backend..."
npm run build

echo "[10/12] Starting PostgreSQL containers..."
cd "$APP_DIR"

COMPOSE_FILE=""
if [ -f "$APP_DIR/docker-compose.yml" ]; then
  COMPOSE_FILE="$APP_DIR/docker-compose.yml"
elif [ -f "$BACKEND_DIR/docker/docker-compose.yml" ]; then
  COMPOSE_FILE="$BACKEND_DIR/docker/docker-compose.yml"
else
  fail "docker-compose.yml not found. Expected /opt/bg-apiary/docker-compose.yml or /opt/bg-apiary/backend/docker/docker-compose.yml"
fi

docker compose -f "$COMPOSE_FILE" up -d

echo "Waiting for PostgreSQL..."
sleep 10

echo "[11/12] Running Prisma..."
cd "$BACKEND_DIR"
npx prisma validate
npx prisma generate

if npx prisma migrate deploy; then
  echo "Prisma migrate deploy completed."
else
  echo "No deployed migrations or deploy failed. Trying migrate dev init..."
  npx prisma migrate dev --name init
fi

echo "[12/12] Publishing frontend to Nginx..."
sudo mkdir -p /var/www/html
sudo rm -rf /var/www/html/*
sudo cp -r "$APP_DIR/dist/"* /var/www/html/
sudo chown -R www-data:www-data /var/www/html

sudo nginx -t
sudo systemctl reload nginx

echo "======================================"
echo " BG Apiary Installer v2.0 finished"
echo "======================================"
echo "Frontend: https://bgapiary.pro"
echo "Backend check:"
echo "curl http://localhost:3000/api/v1/health"
