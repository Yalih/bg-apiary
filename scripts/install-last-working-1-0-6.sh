#!/usr/bin/env bash
set -Eeuo pipefail

cd "${APP_DIR:-/opt/bg-apiary}"

echo "Installing BG Apiary last working version 1.0.6"

if [ -f .env ]; then
  if grep -q "^APP_VERSION=" .env; then
    sed -i "s/^APP_VERSION=.*/APP_VERSION=1.0.6/" .env
  else
    echo "APP_VERSION=1.0.6" >> .env
  fi
fi

bash scripts/install.sh
