#!/usr/bin/env bash
set +e

pass() { printf "%-32s OK\n" "$1"; }
warn() { printf "%-32s WARN: %s\n" "$1" "$2"; }
fail() { printf "%-32s FAIL: %s\n" "$1" "$2"; }

cd "${APP_DIR:-/opt/bg-apiary}" 2>/dev/null || cd .

echo "BG Apiary doctor"
echo "================"

command -v docker >/dev/null 2>&1 && pass "Docker" || fail "Docker" "missing"
docker compose version >/dev/null 2>&1 && pass "Docker Compose" || fail "Docker Compose" "missing"
command -v nginx >/dev/null 2>&1 && pass "Host Nginx" || warn "Host Nginx" "not installed"

[ -f .env ] && pass ".env" || fail ".env" "missing"

for c in bg-apiary-postgres bg-apiary-api; do
  if docker ps --format '{{.Names}}' | grep -q "^${c}$"; then
    pass "Container ${c}"
  else
    fail "Container ${c}" "not running"
  fi
done

if docker ps --format '{{.Names}}' | grep -q '^bg-apiary-web$'; then
  warn "Container bg-apiary-web" "running, host nginx is the default in 1.0.3"
else
  pass "Docker web container optional"
fi

curl -fsS http://127.0.0.1:4000/api/v1/health >/tmp/bgapiary-api-health.json 2>/dev/null && pass "API direct health" || fail "API direct health" "http://127.0.0.1:4000/api/v1/health"
curl -fsS http://127.0.0.1/api/v1/health >/tmp/bgapiary-web-health.json 2>/dev/null && pass "API through Nginx" || fail "API through Nginx" "http://127.0.0.1/api/v1/health"
POST_CODE="$(curl -s -o /tmp/bgapiary-post-check.txt -w "%{http_code}" -X POST http://127.0.0.1/api/v1/auth/login -H "Content-Type: application/json" -d '{"email":"missing-user@bgapiary.local","password":"x"}' || true)"
if [ "$POST_CODE" = "405" ]; then
  fail "API POST through Nginx" "HTTP 405 - login/register blocked"
else
  pass "API POST through Nginx"
fi
curl -fsSI http://127.0.0.1/ >/dev/null 2>&1 && pass "Frontend through Nginx" || fail "Frontend through Nginx" "http://127.0.0.1/"

if [ -f /var/www/html/index.html ]; then
  if grep -q "BG Apiary 1.0" /var/www/html/index.html; then
    pass "Frontend version marker"
  else
    warn "Frontend version marker" "index.html does not contain BG Apiary 1.0"
  fi
else
  fail "Frontend files" "/var/www/html/index.html missing"
fi

docker exec bg-apiary-postgres pg_isready >/dev/null 2>&1 && pass "PostgreSQL" || fail "PostgreSQL" "not ready"

echo
df -h / | tail -1 | awk '{print "Disk usage                     " $5 " used, " $4 " free"}'
free -h | awk '/Mem:/ {print "Memory                         " $3 " used / " $2}'

echo
echo "Nginx POST proxy checks"
echo "-----------------------"

check_post_url() {
  url="$1"
  label="$2"
  code="$(curl -k -s -o /tmp/bgapiary-post-check-body.txt -w "%{http_code}" \
    -X POST "$url/api/v1/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email":"missing-user@bgapiary.local","password":"x"}' || true)"

  if [ "$code" = "405" ]; then
    fail "$label" "HTTP 405 - Nginx blocks API POST"
  elif [ "$code" = "000" ]; then
    warn "$label" "not reachable from this host"
  else
    pass "$label HTTP $code"
  fi
}

check_post_url "http://127.0.0.1" "Local HTTP POST"
check_post_url "http://bgapiary.pro" "Domain HTTP POST"
check_post_url "https://bgapiary.pro" "Domain HTTPS POST"

echo
if [ -s /tmp/bgapiary-api-health.json ]; then
  echo "API direct health response:"
  cat /tmp/bgapiary-api-health.json
  echo
fi

if [ -s /tmp/bgapiary-web-health.json ]; then
  echo "API through Nginx response:"
  cat /tmp/bgapiary-web-health.json
  echo
fi

echo
echo "Recent API logs:"
docker logs bg-apiary-api --tail=30 2>/dev/null || true
