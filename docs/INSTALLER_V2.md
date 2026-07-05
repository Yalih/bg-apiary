# BG Apiary Installer v2.0

## Cel

Installer v2.0 porządkuje pełne wdrażanie BG Apiary na VPS.

Naprawia problem:

```text
npm ERR! ENOTEMPTY
node_modules/...
```

przez pełne czyszczenie `node_modules` przed instalacją.

## Dodane pliki

- `scripts/install.sh`
- `scripts/update.sh`
- `scripts/check.sh`
- `.github/workflows/deploy.yml`
- `docs/INSTALLER_V2.md`

## Co robi `scripts/install.sh`

1. sprawdza narzędzia: git, node, npm, docker,
2. resetuje VPS do GitHub main,
3. tworzy `backend/.env`, jeśli go nie ma,
4. czyści frontendowe `node_modules`,
5. instaluje frontend,
6. buduje frontend,
7. czyści backendowe `node_modules`,
8. instaluje backend,
9. buduje backend,
10. uruchamia PostgreSQL przez Docker Compose,
11. wykonuje Prisma validate/generate/migrate,
12. publikuje frontend do Nginx.

## Ręczne uruchomienie na VPS

```bash
cd /opt/bg-apiary
bash scripts/install.sh
```

## Sprawdzenie

```bash
bash scripts/check.sh
```

## Automatycznie

Po wgraniu do GitHuba workflow wykona instalator na VPS.

```bash
git add .
git commit -m "Add BG Apiary Installer v2"
git push
```

## Ważne

Installer używa:

```bash
git reset --hard origin/main
git clean -fd
```

VPS ma być kopią GitHuba. Lokalne zmiany na VPS będą kasowane. Brutalne, ale skuteczne, czyli rzadki przypadek, gdy brutalność ma sens.
