# Sprint 2.5 - poprawki po testach Sprint 2.4

## Cel

Sprint 2.5 usuwa problemy wykazane w `docs/SPRINT_2_TESTS.md`, bez dodawania backendu, bazy danych i nowych modułów biznesowych.

## Naprawione problemy

### 1. Brak podstawowego trybu offline PWA

W Sprint 2.4 raport wskazywał brak pełnego service workera offline. W Sprint 2.5 dodano minimalny, bezpieczny fallback PWA:

- `public/sw.js` - service worker cacheujący podstawową powłokę aplikacji,
- `public/offline.html` - ekran offline dla sytuacji bez połączenia,
- `src/pwa/registerServiceWorker.ts` - rejestracja service workera po załadowaniu aplikacji.

To nie jest jeszcze pełna synchronizacja danych offline. Dane aplikacji nadal pozostają lokalne w obecnym modelu projektu.

### 2. Niespójność CSS w skip linku

W `src/styles/sprint2.css` skip link używał zmiennej `--s2-ink`, której nie było w tokenach Sprintu 2. Zmieniono ją na istniejący token `--s2-graphite-900`.

### 3. Redukcja animacji

Dodano reguły `prefers-reduced-motion: reduce`, żeby użytkownicy z ograniczoną animacją systemową nie dostawali zbędnych przejść i animacji.

### 4. Najmniejsze ekrany mobile

Dodano dodatkowe poprawki dla ekranów poniżej `360px`:

- mniejszy brand mark,
- ciaśniejsze marginesy aplikacji,
- bezpieczne pozycjonowanie dolnej nawigacji.

### 5. Wersja aplikacji

Zaktualizowano wersję do `BG Apiary v2.5` w:

- `index.html`,
- `public/manifest.webmanifest`,
- `package.json`,
- `TopBar`,
- `AuthPage`,
- dokumentacji.

## Sprawdzenia

Wykonano:

```bash
npm install
npm run build
```

Wynik: build produkcyjny przechodzi.

## Czego nie zmieniono

- Nie dodano backendu.
- Nie dodano bazy danych.
- Nie zmieniono modelu danych.
- Nie przebudowano modułu Ule.
- Nie wykonano pełnego testu w realnej przeglądarce na produkcji, bo to wymaga wdrożenia na `bgapiary.pro`.

## Rekomendowane sprawdzenie po wdrożeniu

1. Otworzyć `https://bgapiary.pro`.
2. Sprawdzić konsolę przeglądarki.
3. W DevTools → Application sprawdzić service worker.
4. Włączyć tryb offline i odświeżyć stronę.
5. Sprawdzić widok na telefonie i iPhonie.
