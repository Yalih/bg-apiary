# BG Apiary Last Working Rollback 1.0.6

## Cel

Ta paczka przywraca ostatnią stabilnie działającą wersję:

```text
BG Apiary 1.0.6 Nginx HTTPS API Fix
```

To jest wersja sprzed modułów 1.1.x, czyli sprzed błędów builda i HTTP 502 po aktualizacji.

## Co zawiera

- frontend 1.0.6,
- backend 1.0.6,
- Docker/PostgreSQL/API,
- działający Nginx HTTP/HTTPS proxy dla `/api`,
- skrypty instalacyjne z linii 1.0.6,
- dodatkowy skrypt awaryjny `scripts/rollback-recover-1-0-6.sh`.

## Wdrożenie przez komputer

1. Rozpakuj ZIP do lokalnego repozytorium.
2. Upewnij się, że pliki są w głównym katalogu repo, a nie jako podfolder.
3. Zacommituj i wypchnij:

```powershell
git add .
git commit -m "Rollback BG Apiary to last working 1.0.6"
git push
```

## VPS

```bash
cd /opt/bg-apiary
git fetch origin main
git reset --hard origin/main
git clean -fd -e .env
bash scripts/install.sh
bash scripts/check.sh
```

## Awaryjne podniesienie strony po 502

Jeżeli strona teraz nie wstaje, po wdrożeniu kodu 1.0.6 użyj:

```bash
cd /opt/bg-apiary
bash scripts/rollback-recover-1-0-6.sh
```

## Testy

```bash
curl http://127.0.0.1:4000/api/v1/health
curl http://127.0.0.1/api/v1/health
curl -i -X POST https://bgapiary.pro/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"missing-user@bgapiary.local","password":"x"}'
```

Dobry wynik dla testowego logowania to `401` albo `400`, nie `405` i nie `502`.

## Ważne

Ta paczka nie kasuje bazy danych. Nie używaj:

```bash
docker compose down -v
```

chyba że świadomie chcesz usunąć dane PostgreSQL.
