# BG Apiary ENV Installer Fix

Ten fix rozwiązuje problem, że plik `.env` nie trafia na VPS albo jest ukryty/przepuszczony przez ZIP.

## Co zawiera

- `scripts/install-env.sh` dla VPS Ubuntu
- `scripts/install-env.ps1` dla Windows
- ten dokument

## Użycie na VPS

Rozpakuj ZIP, a potem uruchom:

```bash
cd /opt/bg-apiary
bash scripts/install-env.sh
```

Jeżeli skryptu nie rozpakujesz do `/opt/bg-apiary/scripts`, możesz uruchomić go z miejsca, gdzie został rozpakowany:

```bash
bash install-env.sh
```

Skrypt utworzy:

```text
/opt/bg-apiary/backend/.env
```

Potem sprawdź:

```bash
cd /opt/bg-apiary/backend
npx prisma validate
```

## Uwaga

To jest konfiguracja startowa/development. Przed produkcją trzeba zmienić hasła i sekrety.
