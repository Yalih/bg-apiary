#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/opt/bg-apiary}"
SITE_NAME="${SITE_NAME:-bgapiary}"
WEB_ROOT="${WEB_ROOT:-/var/www/html}"
DOMAIN="${DOMAIN:-bgapiary.pro}"
WWW_DOMAIN="${WWW_DOMAIN:-www.bgapiary.pro}"
CERT_DIR="/etc/letsencrypt/live/$DOMAIN"

if ! command -v nginx >/dev/null 2>&1; then
  echo "Nginx is not installed. Installing nginx..."
  sudo apt-get update
  sudo apt-get install -y nginx
fi

sudo mkdir -p "$WEB_ROOT"

write_api_locations() {
  cat <<'LOC'
    location ^~ /api/ {
        proxy_pass http://127.0.0.1:4000/api/;
        proxy_http_version 1.1;
        proxy_read_timeout 60s;
        proxy_connect_timeout 10s;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location = /api {
        proxy_pass http://127.0.0.1:4000/api;
        proxy_http_version 1.1;
        proxy_read_timeout 60s;
        proxy_connect_timeout 10s;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
LOC
}

TMP_FILE="$(mktemp)"

{
  cat <<EOF
server {
    listen 80;
    server_name $DOMAIN $WWW_DOMAIN _;

    root $WEB_ROOT;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

EOF
  write_api_locations
  cat <<'EOF'

    location / {
        try_files $uri $uri/ /index.html;
    }

    location = /sw.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
EOF

  if [ -f "$CERT_DIR/fullchain.pem" ] && [ -f "$CERT_DIR/privkey.pem" ]; then
    cat <<EOF

server {
    listen 443 ssl http2;
    server_name $DOMAIN $WWW_DOMAIN;

    ssl_certificate $CERT_DIR/fullchain.pem;
    ssl_certificate_key $CERT_DIR/privkey.pem;

    root $WEB_ROOT;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

EOF
    write_api_locations
    cat <<'EOF'

    location / {
        try_files $uri $uri/ /index.html;
    }

    location = /sw.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
EOF
  fi
} > "$TMP_FILE"

sudo cp "$TMP_FILE" "/etc/nginx/sites-available/$SITE_NAME"
rm -f "$TMP_FILE"

sudo ln -sf "/etc/nginx/sites-available/$SITE_NAME" "/etc/nginx/sites-enabled/$SITE_NAME"
sudo rm -f /etc/nginx/sites-enabled/default

sudo nginx -t
sudo systemctl enable nginx >/dev/null 2>&1 || true
sudo systemctl reload nginx

echo "Nginx configured for BG Apiary."
echo "Checking API POST proxy. Expected HTTP 401 for fake login, not 405."
HTTP_CODE="$(curl -s -o /tmp/bgapiary-nginx-post-check.txt -w "%{http_code}" \
  -X POST http://127.0.0.1/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"missing-user@bgapiary.local","password":"x"}' || true)"

if [ "$HTTP_CODE" = "405" ]; then
  echo "ERROR: Nginx still returns 405 for POST /api/v1/auth/login" >&2
  echo "Active nginx config:" >&2
  sudo nginx -T | grep -n "location .*api" -A12 -B4 >&2 || true
  exit 1
fi

echo "POST proxy check HTTP $HTTP_CODE"
