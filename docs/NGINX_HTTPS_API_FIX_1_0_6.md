# BG Apiary 1.0.6 Nginx HTTPS API Fix

## Problem

Po 1.0.4/1.0.5 backend działał, `POST /api` lokalnie potrafił działać, ale przeglądarka dalej pokazywała:

```text
HTTP 405: Nginx nie przekazuje POST do API
```

Najczęstsza przyczyna: aktywny był stary blok Nginx dla domeny lub HTTPS. Czyli HTTP był naprawiony, ale przeglądarka używała innego server blocka. Nginx, jak widać, potrafi mieć więcej osobowości niż powinien.

## Co robi 1.0.6

- Dodaje `scripts/fix-nginx-api-proxy.sh`.
- `scripts/install-nginx-host.sh` generuje pełny aktywny config Nginx.
- Konfiguracja obejmuje:
  - `listen 80 default_server`,
  - `listen 443 ssl http2 default_server`, jeśli istnieje certyfikat,
  - `location ^~ /api/`,
  - `location = /api`,
  - proxy do `127.0.0.1:4000`.
- Skrypt przenosi stare wpisy z `/etc/nginx/sites-enabled` do backupu, aby nie walczyły o domenę.
- Testuje POST przez:
  - `http://127.0.0.1`,
  - `http://bgapiary.pro`,
  - `https://bgapiary.pro`, jeśli certyfikat istnieje.
- Jeśli pojawi się `405`, skrypt kończy się błędem.

## Szybka naprawa na VPS bez pełnego deployu

```bash
cd /opt/bg-apiary
bash scripts/fix-nginx-api-proxy.sh
```

## Pełny deploy

```bash
cd /opt/bg-apiary
git fetch origin main
git reset --hard origin/main
git clean -fd -e .env
bash scripts/install.sh
bash scripts/check.sh
```

## Dobry test

```bash
curl -i -X POST https://bgapiary.pro/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"missing-user@bgapiary.local","password":"x"}'
```

Dobry wynik to `401` albo `400`. Zły wynik to `405`.
