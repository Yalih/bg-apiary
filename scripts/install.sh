#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/bg-apiary"
BACKEND_DIR="$APP_DIR/backend"
ENV_FILE="$BACKEND_DIR/.env"

echo "=== BG Apiary Installer v1.0 ==="

if [ ! -d "$APP_DIR/.git" ]; then
  echo "ERROR: $APP_DIR is not a git repository."
  echo "Clone the project first:"
  echo "cd /opt && git clone https://github.com/Yalih/bg-apiary.git"
  exit 1
fi

cd "$APP_DIR"

echo "Resetting VPS copy to GitHub main..."
git fetch origin main
git reset --hard origin/main
git clean -fd

echo "Creating backend .env if missing..."
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

echo "Installing frontend dependencies and building frontend..."
cd "$APP_DIR"
npm install --no-audit --no-fund
npm run build

echo "Installing backend dependencies and building backend..."
cd "$BACKEND_DIR"
npm install --no-audit --no-fund
npm run build

echo "Starting PostgreSQL with Docker Compose..."
cd "$APP_DIR"

if [ -f "$APP_DIR/docker-compose.yml" ]; then
  docker compose -f "$APP_DIR/docker-compose.yml" up -d
elif [ -f "$BACKEND_DIR/docker/docker-compose.yml" ]; then
  docker compose -f "$BACKEND_DIR/docker/docker-compose.yml" up -d
else
  echo "ERROR: docker-compose.yml not found."
  echo "Expected either:"
  echo "- /opt/bg-apiary/docker-compose.yml"
  echo "- /opt/bg-apiary/backend/docker/docker-compose.yml"
  exit 1
fi

echo "Waiting for database..."
sleep 10

echo "Running Prisma..."
cd "$BACKEND_DIR"
npx prisma validate
npx prisma generate
npx prisma migrate deploy || npx prisma migrate dev --name init

echo "Publishing frontend to Nginx..."
sudo mkdir -p /var/www/html
sudo rm -rf /var/www/html/*
sudo cp -r "$APP_DIR/dist/"* /var/www/html/
sudo chown -R www-data:www-data /var/www/html

echo "Reloading Nginx..."
sudo nginx -t
sudo systemctl reload nginx

echo "=== BG Apiary install/update finished ==="
echo "Check frontend: https://bgapiary.pro"
echo "Check backend locally: curl http://localhost:3000/api/v1/health"
