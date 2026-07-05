# Sprint 2.4 - raport testów BG Apiary

## Zakres testów

Sprint 2.4 obejmował sprawdzenie wersji po implementacji Sprintu 2.3 pod kątem:

- desktop,
- tablet,
- telefon,
- PWA,
- routing,
- responsywność,
- dostępność,
- kontrast,
- błędy konsoli,
- wydajność,
- poprawność builda produkcyjnego.

## Wynik ogólny

Status: **zaliczony po poprawkach**.

Aplikacja buduje się poprawnie i zachowuje obecny model działania oparty o React, Vite oraz lokalny stan użytkownika. Sprint 2.4 nie dodaje backendu ani bazy danych.

## Wykonane sprawdzenia

### 1. Desktop

Sprawdzono strukturę layoutu desktopowego:

- `TopBar` jest dostępny na górze aplikacji,
- `Sidebar` obsługuje główne moduły,
- główny kontener `main` zawiera treść aplikacji,
- dashboard pozostaje w układzie wielokolumnowym na dużym ekranie.

Wynik: **OK**.

### 2. Tablet

Sprawdzono media queries w `src/styles/sprint2.css`:

- poniżej `1100px` sidebar jest ukrywany,
- layout przechodzi na jeden główny kontener,
- mobile navigation zostaje aktywowana.

Wynik: **OK**.

### 3. Telefon

Sprawdzono reguły dla małych ekranów:

- dashboard przechodzi na jedną kolumnę,
- karty i sekcje zmniejszają siatkę,
- dolna nawigacja działa jako fixed bottom nav,
- dodano obsługę `env(safe-area-inset-bottom)`.

Poprawka w Sprint 2.4:

- dodano dodatkowe bezpieczne odstępy dla mobile nav,
- poprawiono najmniejsze breakpointy poniżej `420px`.

Wynik: **OK po poprawce**.

### 4. PWA

Sprawdzono:

- `public/manifest.webmanifest`,
- ikony `192x192` i `512x512`,
- `theme_color`,
- `background_color`,
- link favicon w `index.html`.

Poprawki w Sprint 2.4:

- dodano `apple-touch-icon`,
- dodano meta description,
- ustawiono `viewport-fit=cover`,
- ustawiono manifest na wersję `BG Apiary v2.4`,
- dodano `purpose: any maskable` dla ikon.

Wynik: **OK dla podstawowej instalowalności PWA**.

Uwaga: projekt nadal nie ma pełnego service workera offline. To powinno wejść dopiero w osobnym sprincie PWA, żeby nie udawać offline tam, gdzie nie ma jeszcze pełnej strategii cache.

### 5. Routing

Projekt nie używa `react-router`. Routing jest stanowy i oparty o typ `View` w `src/App.tsx`.

Sprawdzono:

- typ `View`,
- funkcję `navigate`,
- przekazanie `onNavigate` przez `AppShell` i `AppLayout`,
- nawigację w `TopBar`, `Sidebar` i `MobileNav`.

Poprawki w Sprint 2.4:

- dodano `aria-current` dla aktywnej pozycji sidebar/mobile nav,
- dodano `type="button"` dla przycisków nawigacyjnych,
- dodano dokładniejsze `aria-label` dla akcji w topbarze.

Wynik: **OK po poprawce**.

### 6. Dostępność

Sprawdzono podstawowe elementy dostępności:

- czy główna treść jest oznaczona semantycznym `main`,
- czy nawigacje mają `aria-label`,
- czy przyciski mają czytelne etykiety,
- czy aktywne elementy nawigacji są oznaczane.

Poprawki w Sprint 2.4:

- dodano skip link `Przejdź do treści`,
- dodano `id="main-content"` i `tabIndex={-1}` dla głównej treści,
- dodano style `:focus-visible`,
- dodano `aria-current="page"` dla aktywnej nawigacji.

Wynik: **OK po poprawce**.

### 7. Kontrast

Sprawdzono statycznie główne kombinacje kolorów w aktualnym motywie:

- tekst na jasnych kartach,
- aktywna nawigacja,
- przyciski główne,
- tła sekcji dashboardu,
- alerty/statusy.

Poprawki w Sprint 2.4:

- dodano widoczny focus ring,
- poprawiono obsługę fokusu dla przycisków i linków.

Wynik: **OK dla podstawowego UI**.

### 8. Błędy konsoli

Pełny test konsoli w przeglądarce nie został wykonany w tym środowisku, ponieważ lokalna sesja Chromium blokuje otwieranie serwera deweloperskiego (`ERR_BLOCKED_BY_ADMINISTRATOR`).

Zastępczo wykonano:

- `npm install`,
- `npm run build`,
- statyczny przegląd głównych importów,
- sprawdzenie konfiguracji Vite,
- sprawdzenie manifestu i index.html.

Wynik: **brak błędów builda**.

### 9. Wydajność

Wynik produkcyjnego builda:

- CSS: około 162.70 kB,
- JS: około 381.01 kB,
- gzip JS: około 109.94 kB.

Wniosek:

- aplikacja jest akceptowalna na obecny etap,
- w przyszłości warto rozważyć podział kodu i lazy loading ekranów, bo `App.tsx` importuje wiele stron naraz.

## Naprawione problemy

1. Import `sprint2.css` w `src/main.tsx` był na końcu pliku po renderze Reacta. Został przeniesiony do bloku importów.
2. Brakowało skip linka do głównej treści. Dodano.
3. Aktywne pozycje nawigacji nie miały `aria-current`. Dodano.
4. Przyciski nawigacji nie miały jawnego `type="button"`. Dodano.
5. Topbar miał stare oznaczenie wersji `v2.3`. Zmieniono na `v2.4`.
6. Auth screen miał stary opis `BgApiary 1.0 RC-UserTest`. Zmieniono na `BG Apiary v2.4 · Tryb lokalny`.
7. `index.html` nie miał `apple-touch-icon`, `meta description` i `viewport-fit=cover`. Dodano.
8. Manifest został zaktualizowany do `BG Apiary v2.4` i ikon z `purpose: any maskable`.

## Pliki zmienione w Sprint 2.4

- `src/main.tsx`
- `src/layouts/AppLayout.tsx`
- `src/components/navigation/TopBar.tsx`
- `src/components/navigation/Sidebar.tsx`
- `src/components/navigation/MobileNav.tsx`
- `src/pages/AuthPage.tsx`
- `src/styles/sprint2.css`
- `index.html`
- `public/manifest.webmanifest`
- `package.json`
- `package-lock.json`
- `README.md`
- `CHANGELOG.md`
- `docs/SPRINT_2_TESTS.md`

## Build

Komendy wykonane:

```bash
npm install
npm run build
```

Wynik:

```text
✓ built in 1.37s
```

## Priorytety po Sprint 2.4

1. Pełny test ręczny na fizycznym telefonie po wdrożeniu na `bgapiary.pro`.
2. Sprawdzenie konsoli przeglądarki na produkcji.
3. Wydzielenie `App.tsx` na mniejsze moduły.
4. Dodanie prawdziwego service workera offline w osobnym sprincie.
5. Przygotowanie testów automatycznych dla logowania i podstawowej nawigacji.
