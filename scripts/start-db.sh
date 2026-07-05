#!/usr/bin/env bash
set -e

cd /opt/bg-apiary

echo "Starting BG Apiary PostgreSQL..."
docker compose up -d postgres pgadmin

echo "Waiting for PostgreSQL..."
sleep 8

docker ps

echo "Now run:"
echo "cd /opt/bg-apiary/backend"
echo "npx prisma validate"
echo "npx prisma migrate dev --name init"
