#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/opt/bg-apiary}"
SITE_NAME="${SITE_NAME:-bgapiary}"
WEB_ROOT="${WEB_ROOT:-/var/www/html}"

if ! command -v nginx >/dev/null 2>&1; then
  echo "Nginx is not installed. Installing nginx..."
  sudo apt-get update
  sudo apt-get install -y nginx
fi

sudo mkdir -p "$WEB_ROOT"
sudo cp "$APP_DIR/docker/nginx-host.conf" "/etc/nginx/sites-available/$SITE_NAME"
sudo ln -sf "/etc/nginx/sites-available/$SITE_NAME" "/etc/nginx/sites-enabled/$SITE_NAME"
sudo rm -f /etc/nginx/sites-enabled/default

sudo nginx -t
sudo systemctl enable nginx >/dev/null 2>&1 || true
sudo systemctl reload nginx
