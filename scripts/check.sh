#!/usr/bin/env bash
set +e

pass() { printf "%-28s OK\n" "$1"; }
warn() { printf "%-28s WARN: %s\n" "$1" "$2"; }
fail() { printf "%-28s FAIL: %s\n" "$1" "$2"; }

cd "${APP_DIR:-/opt/bg-apiary}" 2>/dev/null || cd .

echo "BG Apiary doctor"
echo "================"

command -v docker >/dev/null 2>&1 && pass "Docker" || fail "Docker" "missing"
docker compose version >/dev/null 2>&1 && pass "Docker Compose" || fail "Docker Compose" "missing"

if [ -f .env ]; then pass ".env"; else fail ".env" "missing"; fi

for c in bg-apiary-postgres bg-apiary-api bg-apiary-web; do
  if docker ps --format '{{.Names}}' | grep -q "^${c}$"; then
    pass "Container ${c}"
  else
    fail "Container ${c}" "not running"
  fi
done

curl -fsS http://127.0.0.1:4000/api/v1/health >/tmp/bgapiary-api-health.json 2>/dev/null && pass "API direct health" || fail "API direct health" "http://127.0.0.1:4000/api/v1/health"
curl -fsS http://127.0.0.1/api/v1/health >/tmp/bgapiary-web-health.json 2>/dev/null && pass "API through web" || fail "API through web" "http://127.0.0.1/api/v1/health"
curl -fsS http://127.0.0.1/ >/dev/null 2>&1 && pass "Frontend" || fail "Frontend" "http://127.0.0.1/"

docker exec bg-apiary-postgres pg_isready >/dev/null 2>&1 && pass "PostgreSQL" || fail "PostgreSQL" "not ready"

df -h / | tail -1 | awk '{print "Disk usage                 " $5 " used, " $4 " free"}'
free -h | awk '/Mem:/ {print "Memory                     " $3 " used / " $2}'

echo
if [ -s /tmp/bgapiary-api-health.json ]; then
  echo "API health response:"
  cat /tmp/bgapiary-api-health.json
  echo
fi

echo "Recent API logs:"
docker logs bg-apiary-api --tail=30 2>/dev/null || true
