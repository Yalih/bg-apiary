# Sprint 2.6 - finalne wydanie Sprintu 2

## Status

Sprint 2 został domknięty jako finalne wydanie **BG Apiary v2.6**.

## Cel wydania

Celem Sprintu 2 było przygotowanie profesjonalnej warstwy wizualnej aplikacji przed rozpoczęciem większych modułów biznesowych. Wydanie v2.6 nie dodaje backendu ani bazy danych. Stabilizuje fundament UI/UX, PWA i dokumentację.

## Zakres potwierdzony w wydaniu

### UI/UX

- topbar aplikacji,
- sidebar desktop,
- mobile bottom navigation,
- dashboard v2,
- sekcje statystyk, zadań, stanu rodzin i pogody/pożytku,
- finalne poprawki fokusów, kontrastu i mobile.

### Branding i PWA

- ikona marki,
- manifest PWA,
- apple touch icon,
- service worker,
- ekran offline,
- wersja `BG Apiary v2.6` w metadanych.

### Dostępność

- focus states,
- `aria-current` w nawigacji,
- skip link,
- poprawki pod `prefers-reduced-motion`.

## Pliki objęte finalizacją

- `README.md`
- `CHANGELOG.md`
- `docs/CHANGELOG.md`
- `docs/SPRINT_2_FINAL_RELEASE.md`
- `index.html`
- `package.json`
- `package-lock.json`
- `public/manifest.webmanifest`
- `public/sw.js`
- `public/offline.html`
- `src/components/navigation/TopBar.tsx`
- `src/pages/AuthPage.tsx`
- `src/pages/DashboardPage.tsx`
- `src/styles/sprint2.css`

## Wynik kontroli

Wydanie powinno przejść:

```bash
npm install
npm run build
```

## Zadania wejściowe do Sprintu 3 - Moduł Ule

1. Uporządkować ekran listy uli jako główny moduł biznesowy.
2. Zaprojektować kartę ula z jasnym statusem rodziny.
3. Dodać filtry: pasieka, siła, status matki, zadania pilne.
4. Przebudować szczegóły ula pod pracę przy pasiece na telefonie.
5. Połączyć historię przeglądów z kartą ula.
6. Przygotować formularz szybkiego przeglądu.
7. Zachować localStorage do czasu Sprintu backendowego.

## Uwaga produkcyjna

Po wdrożeniu warto wykonać twarde odświeżenie strony albo odinstalować/zainstalować PWA ponownie, jeśli przeglądarka trzyma starą wersję z cache service workera. Bo oczywiście cache istnieje po to, żeby człowiek przez chwilę wątpił we własny wzrok.
