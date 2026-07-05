
## BG Apiary v3.4 – running backend foundation

- PostgreSQL/Prisma backend endpoints for health, apiaries and hives.
- Added initial Prisma migration SQL and seed script.
- Added database setup and API reference documentation.


## BG Apiary v2.6.1 - Mobile nav and Notes fix

- Fixed duplicated bottom-navigation feel on Hive Details by moving quick actions into normal page flow.
- Fixed Notes tab overlap with quick action toolbar.
- Improved mobile safe-area spacing and quick-action wrapping.
- Aligned hive detail tile icons.

# Changelog

## BG Apiary v2.6.0 – Sprint 2 Final Release

- Zamknięto Sprint 2 jako finalne wydanie warstwy UI/UX.
- Ujednolicono wersję aplikacji w `package.json`, `index.html`, `manifest.webmanifest`, ekranie logowania, dashboardzie i topbarze.
- Zaktualizowano cache service workera do `bg-apiary-v2-6-shell`, aby przeglądarki nie trzymały starej wersji jak pamiątki po Windows XP.
- Dodano finalne drobne poprawki CSS: focus ring, standalone PWA polish, mobile hero i stabilniejsze stany interakcji.
- Zaktualizowano README, CHANGELOG i dokument finalnego wydania Sprintu 2.
- Przygotowano listę wejściową do Sprintu 3: Moduł Ule.

## BG Apiary v2.3.0 – Sprint 2.3 Implementation

- Dodano realny layout aplikacji: topbar, sidebar desktop i mobile bottom nav.
- Przebudowano dashboard na wersję premium v2.3.
- Dodano karty statystyk, szybkie akcje, listę zadań, stan rodzin, pogodę/pożytek i ostatni przegląd.
- Dodano podstawowe pliki brandingu SVG i ikony PWA.
- Dodano `src/styles/sprint2.css` jako warstwę wizualną Sprintu 2.
- Zaktualizowano manifest i tytuł aplikacji.

## Uwaga
Nie zmieniono backendu, bazy danych ani modelu danych.


## BG Apiary v2.4 - Sprint 2.4 tests
- Dodano raport testów UI/PWA/responsywności.
- Poprawiono dostępność nawigacji, skip link, metadane PWA i porządek importów CSS.

## BG Apiary v2.5 - Sprint 2.5 fixes
- Dodano `public/sw.js` i `public/offline.html`.
- Dodano rejestrację service workera w `src/pwa/registerServiceWorker.ts`.
- Naprawiono zmienną CSS skip linka i poprawiono redukcję animacji.
- Zaktualizowano wersję aplikacji do `2.5.0`.

## Sprint 3.3 – Backend API foundation

Added backend foundation under `backend/` with Express, TypeScript, Prisma, PostgreSQL schema, JWT helper structure, Swagger, Docker Compose and documentation. Business logic is not implemented yet.



## BG Apiary v3.5 – Frontend API Integration
- Usunięto localStorage jako źródło danych biznesowych.
- Dodano klienta API i health check backendu.
- Pasieki i ule pobierane są z backendu PostgreSQL API.
- Dodano ekran Backend unavailable i obsługę błędów sieciowych.
