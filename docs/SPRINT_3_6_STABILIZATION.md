# Sprint 3.6 – Stabilizacja Backend + Frontend

## Cel
Doprowadzenie projektu do stabilnego fundamentu przed Sprintem 4.0, czyli modułem Ule.

## Zakres wykonany
- Dodano formalne modele API/DTO dla frontendu i backendu.
- Dodano wspólny serwis `apiStateService` jako warstwę między komponentami a API.
- Dodano podstawowy hook `useAsyncAction` do przyszłych operacji asynchronicznych.
- Dodano strukturę katalogów `features/` pod moduły biznesowe.
- Dodano helpery backendowe dla odpowiedzi API i paginacji.
- Poprawiono `prisma.ts`, aby backend przechodził build także przed lokalnym wygenerowaniem Prisma Client.
- Dodano `.gitignore`, aby `dist`, `node_modules` i pliki `.env` nie trafiały do repo.

## Czego nie robiono
- Nie dodawano modułu Ule.
- Nie zmieniano logiki biznesowej.
- Nie uruchamiano produkcyjnej migracji bazy danych.
- Nie wdrażano backendu na VPS.

## Wyniki weryfikacji
- Frontend `npm run build`: OK.
- Backend `npm run build`: OK po stabilizacji Prisma wrapper.
- Prisma `npx prisma validate`: wymaga dostępu do silników Prisma. W tym środowisku pobieranie z `binaries.prisma.sh` było niedostępne.
- Docker `docker compose config`: nieuruchomione, ponieważ w środowisku wykonawczym nie ma Dockera.

## Gotowość do Sprintu 4.0
Projekt ma już przygotowane granice architektury pod moduły biznesowe. Sprint 4.0 może rozpocząć implementację modułu Ule na backendzie i frontendzie.
