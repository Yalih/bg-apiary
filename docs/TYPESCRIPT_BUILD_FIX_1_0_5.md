# BG Apiary 1.0.5 TypeScript Build Fix

## Naprawiony błąd

W 1.0.4 build frontendu mógł kończyć się błędem:

```text
tsconfig.json - error TS5103: Invalid value for '--ignoreDeprecations'.
"ignoreDeprecations": "6.0"
```

## Przyczyna

W `frontend/tsconfig.json` znalazła się wartość `ignoreDeprecations: "6.0"`, której używana wersja TypeScript nie akceptuje.

## Poprawka

- Usunięto `ignoreDeprecations` z `frontend/tsconfig.json`.
- Zostawiono `moduleResolution: "Bundler"`.
- Zostawiono `types: ["vite/client"]`.
- Zaktualizowano cache/PWA do `1.0.5`.
- Wyciszono konflikt starej sieci Dockera `bg-apiary_default` przez próbę jej usunięcia przed startem.

## Deploy

```bash
cd /opt/bg-apiary
git fetch origin main
git reset --hard origin/main
git clean -fd -e .env
bash scripts/install.sh
bash scripts/check.sh
```

## Dobry wynik

- `npm run build` przechodzi,
- `curl http://127.0.0.1/api/v1/health` zwraca JSON,
- testowy `POST /api/v1/auth/login` zwraca 401, nie 405.
