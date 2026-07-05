#!/usr/bin/env bash
set -Eeuo pipefail

cd "$(dirname "$0")/.."

echo "BG Apiary 1.0.3 - clean local build"

rm -rf node_modules frontend/node_modules backend/node_modules
rm -f package-lock.json frontend/package-lock.json backend/package-lock.json frontend/tsconfig.tsbuildinfo

npm cache clean --force || true

npm --prefix frontend install --include=dev --no-audit --no-fund --prefer-online
npm --prefix frontend run build

export PRISMA_SKIP_POSTINSTALL_GENERATE=true
npm --prefix backend install --include=dev --no-audit --no-fund --prefer-online
npm --prefix backend run build

echo "OK - local build passed"
