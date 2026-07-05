#!/bin/sh
set -e

echo "Generating Prisma Client for current runtime..."
npx prisma generate --schema=prisma/schema.prisma

if [ -d prisma/migrations ] && [ "$(find prisma/migrations -mindepth 1 -maxdepth 1 -type d | wc -l)" -gt 0 ]; then
  echo "Running Prisma migrations..."
  npx prisma migrate deploy --schema=prisma/schema.prisma
else
  echo "No Prisma migrations found. Applying schema with prisma db push..."
  npx prisma db push --schema=prisma/schema.prisma --accept-data-loss
fi

echo "Starting BG Apiary API..."
node dist/server.js
