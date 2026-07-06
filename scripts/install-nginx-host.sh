#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-/opt/bg-apiary}"
SITE_NAME="${SITE_NAME:-bgapiary}"
WEB_ROOT="${WEB_ROOT:-/var/www/html}"
DOMAIN="${DOMAIN:-bgapiary.pro}"
WWW_DOMAIN="${WWW_DOMAIN:-www.bgapiary.pro}"
API_UPSTREAM="${API_UPSTREAM:-http://127.0.0.1:4000}"
CERT_DIR="${CERT_DIR:-/etc/letsencrypt/live/$DOMAIN}"
BACKUP_DIR="/etc/nginx/bgapiary-disabled-sites-$(date +%Y%m%d-%H%M%S)"

say() { echo "[nginx] $*"; }
fail() { echo "[nginx][ERROR] $*" >&2; exit 1; }

if ! command -v nginx >/dev/null 2>&1; then
  say "Nginx is not installed. Installing nginx..."
  sudo apt-get update
  sudo apt-get install -y nginx
fi

sudo mkdir -p "$WEB_ROOT"
sudo mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled

# Dedicated VPS mode: stale configs are the usual reason for HTTP 405 on HTTPS.
# Move every enabled site except our final symlink to a backup directory.
sudo mkdir -p "$BACKUP_DIR"
for enabled in /etc/nginx/sites-enabled/*; do
  [ -e "$enabled" ] || continue
  base="$(basename "$enabled")"
  if [ "$base" != "$SITE_NAME" ]; then
    say "Disabling old enabled site: $base"
    sudo mv "$enabled" "$BACKUP_DIR/$base" || true
  fi
done

# Remove older conf.d variants from previous experiments, but keep unrelated nginx package files.
sudo rm -f /etc/nginx/conf.d/bgapiary.conf /etc/nginx/conf.d/bg-apiary.conf 2>/dev/null || true

TMP_FILE="$(mktemp)"

write_common_server_body() {
  local proto="$1"
  cat <<EOF
    root $WEB_ROOT;
    index index.html;

    client_max_body_size 25m;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

    add_header X-BG-Apiary-Nginx "1.0.6" always;

    location ^~ /api/ {
        proxy_pass $API_UPSTREAM/api/;
        proxy_http_version 1.1;
        proxy_read_timeout 60s;
        proxy_connect_timeout 10s;

        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $proto;
        proxy_set_header X-Forwarded-Host \$host;
    }

    location = /api {
        proxy_pass $API_UPSTREAM/api;
        proxy_http_version 1.1;
        proxy_read_timeout 60s;
        proxy_connect_timeout 10s;

        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $proto;
        proxy_set_header X-Forwarded-Host \$host;
    }

    location = /sw.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        try_files \$uri =404;
    }

    location / {
        try_files \$uri \$uri/ /index.html;
    }
EOF
}

{
  cat <<EOF
# Managed by BG Apiary 1.0.6.
# Do not edit by hand unless you enjoy re-debugging HTTP 405 like it owes you money.

server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name $DOMAIN $WWW_DOMAIN _;
EOF
  write_common_server_body "http"
  cat <<'EOF'
}
EOF

  if [ -f "$CERT_DIR/fullchain.pem" ] && [ -f "$CERT_DIR/privkey.pem" ]; then
    cat <<EOF

server {
    listen 443 ssl http2 default_server;
    listen [::]:443 ssl http2 default_server;
    server_name $DOMAIN $WWW_DOMAIN _;

    ssl_certificate $CERT_DIR/fullchain.pem;
    ssl_certificate_key $CERT_DIR/privkey.pem;
EOF
    write_common_server_body "https"
    cat <<'EOF'
}
EOF
  fi
} > "$TMP_FILE"

sudo cp "$TMP_FILE" "/etc/nginx/sites-available/$SITE_NAME"
rm -f "$TMP_FILE"
sudo ln -sfn "/etc/nginx/sites-available/$SITE_NAME" "/etc/nginx/sites-enabled/$SITE_NAME"

say "Testing Nginx config"
sudo nginx -t
sudo systemctl enable nginx >/dev/null 2>&1 || true
sudo systemctl reload nginx

say "Active API locations:"
sudo nginx -T 2>/dev/null | grep -n "location .*api" -A12 -B4 || true

test_post() {
  local url="$1"
  local expected_allow_000="${2:-false}"
  local code
  code="$(curl -k -s -o /tmp/bgapiary-nginx-post-check.txt -w "%{http_code}" \
    -X POST "$url/api/v1/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email":"missing-user@bgapiary.local","password":"x"}' || true)"

  if [ "$code" = "405" ]; then
    echo "Body:" >&2
    cat /tmp/bgapiary-nginx-post-check.txt >&2 || true
    fail "$url returns HTTP 405 for POST /api/v1/auth/login"
  fi

  if [ "$code" = "000" ] && [ "$expected_allow_000" = "true" ]; then
    say "$url not reachable from server now, skipped"
    return 0
  fi

  if [ "$code" = "401" ] || [ "$code" = "400" ]; then
    say "$url POST proxy OK: HTTP $code"
    return 0
  fi

  say "$url POST proxy returned HTTP $code, not 405. Response follows:"
  cat /tmp/bgapiary-nginx-post-check.txt || true
}

say "Checking local HTTP POST proxy. Expected 401/400, never 405."
test_post "http://127.0.0.1"

say "Checking domain HTTP POST proxy. Expected 401/400, never 405."
test_post "http://$DOMAIN" true

if [ -f "$CERT_DIR/fullchain.pem" ] && [ -f "$CERT_DIR/privkey.pem" ]; then
  say "Checking domain HTTPS POST proxy. Expected 401/400, never 405."
  test_post "https://$DOMAIN" true
else
  say "No certificate found in $CERT_DIR. HTTPS block was not written."
fi

say "Nginx configured for BG Apiary."
say "Old enabled site configs, if any, were moved to: $BACKUP_DIR"
