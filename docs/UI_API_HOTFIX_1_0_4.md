# BG Apiary 1.0.4 UI/API Hotfix

## Co naprawia

Ta wersja naprawia dwa problemy po stabilizacji 1.0.3:

1. Formularz logowania/rejestracji zwracał `HTTP 405`.
2. Pierwszy ekran wyglądał źle na telefonie i mógł używać starego cache/PWA.

## Przyczyna HTTP 405

`HTTP 405` przy logowaniu/rejestracji oznacza, że żądanie `POST /api/v1/auth/login` lub `POST /api/v1/auth/register` trafiło do Nginx jako statyczny frontend, zamiast do backendu Fastify.

W skrócie: Nginx serwował aplikację, ale nie przepuszczał poprawnie metod POST do `/api/`.

## Poprawki

- `scripts/install-nginx-host.sh` generuje pełną konfigurację Nginx.
- Konfiguracja obejmuje:
  - HTTP,
  - HTTPS, jeśli istnieją certyfikaty Let's Encrypt,
  - `location ^~ /api/`,
  - `location = /api`.
- Instalator i check script testują nie tylko `GET /health`, ale też `POST /auth/login`.
- Jeśli Nginx zwróci 405, instalator pokaże błąd zamiast udawać sukces.

## Poprawki UI/PWA

- Nowy mobilny CSS dla ekranu logowania.
- Ukrycie mockupu telefonu na małych ekranach, żeby nie robił czarnego wieloryba przez pół strony.
- Lepsze rozmiary nagłówków i pól formularza.
- Service Worker ma wersję `1.0.4`.
- Aplikacja czyści stare cache i stare service workery po zmianie wersji.

## Deploy

```bash
cd /opt/bg-apiary
git fetch origin main
git reset --hard origin/main
git clean -fd -e .env
bash scripts/install.sh
bash scripts/check.sh
```

## Natychmiastowy test

```bash
curl http://127.0.0.1/api/v1/health

curl -i -X POST http://127.0.0.1/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"missing-user@bgapiary.local","password":"x"}'
```

Oczekiwane:
- `/health` zwraca JSON,
- testowy login zwraca 401, a nie 405.

401 jest dobry, bo oznacza, że żądanie trafiło do backendu. 405 oznacza zły Nginx.
