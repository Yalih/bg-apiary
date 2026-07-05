#!/bin/sh
set -e

echo "Generating Prisma Client for current runtime..."
npx prisma generate --schema=prisma/schema.prisma

echo "Running Prisma migrations..."
npx prisma migrate deploy --schema=prisma/schema.prisma

echo "Starting BG Apiary API..."
node dist/server.js
