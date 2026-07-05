#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/bg-apiary"

echo "=== BG Apiary Update v1.0 ==="

cd "$APP_DIR"

echo "Resetting local VPS files to GitHub main..."
git fetch origin main
git reset --hard origin/main
git clean -fd

bash "$APP_DIR/scripts/install.sh"
