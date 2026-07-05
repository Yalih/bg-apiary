# BG Apiary Installer v3.0

## Co naprawia

Installer v3.0 rozwiązuje problem konfliktu kontenerów Docker:

```text
The container name "/bg-apiary-postgres" is already in use
```

oraz wcześniejsze problemy:

- stare `node_modules`,
- brak `.env`,
- brak aktualizacji pełnego repo na VPS,
- ręczne konflikty `git pull`,
- powtarzające się błędy przy Docker Compose.

## Pliki

- `scripts/install.sh`
- `scripts/update.sh`
- `scripts/check.sh`
- `.github/workflows/deploy.yml`
- `docs/INSTALLER_V3.md`

## Najważniejsze zmiany względem v2

- robi backup istniejącego `backend/.env`,
- wykonuje `docker compose down --remove-orphans`,
- usuwa stare kontenery:
  - `bg-apiary-postgres`
  - `bg-apiary-backend`
  - `bg-apiary-pgadmin`
- uruchamia `docker compose up -d --build`,
- czeka na PostgreSQL,
- wykonuje Prisma validate/generate/migrate,
- publikuje frontend do Nginx,
- robi health check API i strony.

## Ręczne uruchomienie na VPS

```bash
cd /opt/bg-apiary
bash scripts/install.sh
```

## Sprawdzenie

```bash
bash scripts/check.sh
```

## Automatyczne wdrożenie

Po wgraniu plików do repo:

```bash
git add .
git commit -m "Add BG Apiary Installer v3"
git push
```

Workflow GitHub Actions połączy się z VPS i wykona installer.

## Uwaga

Installer wykonuje:

```bash
git reset --hard origin/main
git clean -fd
```

VPS zostaje ustawiony jako czysta kopia GitHuba. Lokalne zmiany na VPS znikną. Brutalne, ale przynajmniej przestaniemy bawić się w ręczne poprawianie rzeczy, które Git powinien robić od początku.
