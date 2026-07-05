# BG Apiary Installer v1.0

Ten update porządkuje wdrożenie.

## Cel

Po `git push` GitHub Actions ma połączyć się z VPS i wykonać pełną aktualizację:

1. `git fetch`
2. `git reset --hard origin/main`
3. instalacja zależności frontendu
4. build frontendu
5. instalacja zależności backendu
6. build backendu
7. uruchomienie PostgreSQL przez Docker Compose
8. Prisma validate/generate/migrate
9. publikacja frontendu do Nginx

## Pliki

- `scripts/install.sh`
- `scripts/update.sh`
- `.github/workflows/deploy.yml`

## Pierwsze uruchomienie ręczne na VPS

```bash
cd /opt/bg-apiary
bash scripts/install.sh
```

## Aktualizacja ręczna na VPS

```bash
cd /opt/bg-apiary
bash scripts/update.sh
```

## Automatycznie

Po `git push` workflow wykona:

```bash
bash scripts/install.sh
```

## Ważne

Skrypt celowo wykonuje:

```bash
git reset --hard origin/main
git clean -fd
```

To usuwa lokalne zmiany na VPS. VPS ma być kopią GitHuba, a nie osobnym warsztatem chaosu.
