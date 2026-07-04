# Changelog

## BG Apiary v2.0.9 - Sprint 2.0.9 Final UI Polish

### Dodano
- `src/version.ts` jako centralne miejsce numeru wersji widocznej w UI.
- `src/styles/final-polish.css` z końcowym wyrównaniem motywów, dashboardu, layoutu, focus states i preferencji reduced motion.
- Dokumentację `docs/SPRINT_2_0_9_FINAL_POLISH.md`.
- Podsumowanie `docs/SPRINT_2_SUMMARY.md` oraz listę wejściową do Sprintu 3.0.

### Zmieniono
- Tytuł aplikacji ustawiony na `BG Apiary v2.0.9`.
- `TopBar` korzysta z centralnej wersji z `src/version.ts`.
- `package.json`: wersja projektu ustawiona na `2.0.9-final-ui-polish`.
- Manifest PWA: nazwa wersji ustawiona na `BG Apiary v2.0.9`.
- Dashboard, layout, komponenty UI i PWA dostały końcowe dopracowanie spójności kolorów, kontrastu i dostępności.

### Nie zmieniono
- Nie dodawano modułu Ule.
- Nie ruszano backendu ani bazy danych.
- Nie zmieniano logiki biznesowej istniejących modułów.

### Sprawdzenie
- `npm install` ✅
- `npm run build` ✅

## BG Apiary v2.0.8 - Sprint 2.0.8 PWA Installation Support

### Dodano
- `public/sw.js` jako podstawowy service worker z cache app shell i fallbackiem offline.
- `public/offline.html` jako prosty ekran offline dla nawigacji bez internetu.
- `src/pwa/registerServiceWorker.ts` z bezpieczną rejestracją service workera.
- Meta tagi PWA i Apple mobile w `index.html`.
- Ulepszony manifest z `id`, `scope`, `orientation`, `categories`, `lang`, `display_override` i skrótami.
- Dokumentację `docs/SPRINT_2_0_8_PWA.md`.

### Zmieniono
- Tytuł aplikacji ustawiony na `BG Apiary v2.0.8`.
- `package.json`: wersja projektu ustawiona na `2.0.8-pwa-installation-support`.
- Manifest PWA: nazwa wersji ustawiona na `BG Apiary v2.0.8`.
- `main.tsx` rejestruje service worker po inicjalizacji motywu.

### Nie zmieniono
- Nie ruszano backendu.
- Nie dodawano bazy danych.
- Nie zmieniano logiki modułów biznesowych.

### Sprawdzenie
- `npm install` ✅
- `npm run build` ✅

## BG Apiary v2.0.7 - Sprint 2.0.7 Mobile Responsive Polish

### Dodano
- Osobny plik `src/styles/mobile-polish.css` dla dopracowania mobile-first.
- Safe-area spacing dla iPhone/Android przez `env(safe-area-inset-*)`.
- Lepsze reguły dla tabletów, małych telefonów oraz ekranów poniżej 430 px i 360 px.
- Większe pola dotyku dla nawigacji, przycisków, kart akcji i formularzy.
- Dokumentację `docs/SPRINT_2_0_7_MOBILE_POLISH.md`.

### Zmieniono
- `TopBar` pokazuje wersję `v2.0.7`.
- Dashboard dostał dopracowane odstępy, promienie kart, wielkości nagłówków i układ mobile.
- Dolna nawigacja mobilna ma lepsze dopasowanie do safe-area oraz krótkich szerokości.
- `main.tsx` importuje `src/styles/mobile-polish.css`.
- Tytuł aplikacji ustawiony na `BG Apiary v2.0.7`.
- `package.json`: wersja projektu ustawiona na `2.0.7-mobile-polish`.
- Manifest PWA: nazwa wersji ustawiona na `BG Apiary v2.0.7`.

### Nie zmieniono
- Nie ruszano backendu.
- Nie dodawano bazy danych.
- Nie dodawano nowych modułów biznesowych.

### Sprawdzenie
- `npm install` ✅
- `npm run build` ✅

## BG Apiary v2.0.6 - Sprint 2.0.6 Theme Mode Switcher

### Dodano
- Komponent `ThemeToggle` dla trybów: jasny, ciemny i systemowy.
- Moduł `src/theme.ts` z obsługą preferencji motywu, `localStorage` i `prefers-color-scheme`.
- Zmienne CSS dla jawnych trybów light/dark w `src/styles/design-tokens.css`.
- Dokumentację `docs/SPRINT_2_0_6_THEME_MODE.md`.

### Zmieniono
- `TopBar` pokazuje wersję `v2.0.6` i zawiera przełącznik motywu.
- `main.tsx` inicjalizuje motyw przed renderem aplikacji.
- Poprawiono kontrast layoutu, topbaru, sidebaru, mobile nav i komponentów UI.
- Tytuł aplikacji ustawiony na `BG Apiary v2.0.6`.
- `package.json`: wersja projektu ustawiona na `2.0.6-theme-mode`.
- Manifest PWA: nazwa wersji ustawiona na `BG Apiary v2.0.6`.

### Sprawdzenie
- `npm install` ✅
- `npm run build` ✅

## BG Apiary v2.0.5 - Sprint 2.0.5 Icons and Visual Assets

### Dodano

- Ikony modułów w `public/brand/icons/`: dashboard, ule, matki, przeglądy, zadania, kalendarz, statystyki, pogoda, ustawienia, notatki, GPS i alerty.
- Placeholdery w `public/brand/placeholders/`: ul, matka, pasieka, brak danych, błąd i sukces.
- Manifest assetów `src/assets/visualAssets.ts`.
- Komponenty `Icon` i `PlaceholderGraphic` w `src/components/ui/Icon.tsx`.
- Eksport komponentów assetów w `src/components/ui/index.ts`.
- Style assetów w `src/styles/ui.css`.
- Dokumentację `docs/SPRINT_2_0_5_ICONS_ASSETS.md`.

### Zmieniono

- Tytuł aplikacji na `BG Apiary v2.0.5`.
- `package.json`: wersja projektu ustawiona na `2.0.5-icons-assets`.
- Manifest PWA: nazwa wersji ustawiona na `BG Apiary v2.0.5`.

### Nie zmieniono

- Nie ruszano backendu.
- Nie dodawano bazy danych.
- Nie przebudowywano dashboardu.
- Nie usuwano istniejących funkcji.

## BG Apiary v2.0.4 - Sprint 2.0.4 UI Component System

### Dodano

- Komponent `Button` z wariantami, rozmiarami i opcją pełnej szerokości.
- Komponent `Card` z nagłówkiem, akcjami i tonami statusów.
- Komponent `Badge` dla statusów i etykiet.
- Komponent `Input` z etykietą, hintem, błędem i ikoną.
- Komponent `Select` z opcjami i obsługą komunikatów.
- Komponent `Modal` jako dostępne okno dialogowe.
- Komponent `EmptyState` dla braku danych.
- Komponent `PageHeader` dla spójnych nagłówków stron.
- Eksport zbiorczy `src/components/ui/index.ts`.
- Style komponentów w `src/styles/ui.css`.
- Dokumentację `docs/SPRINT_2_0_4_UI_COMPONENTS.md`.

### Zmieniono

- Tytuł aplikacji na `BG Apiary v2.0.4`.
- `package.json`: wersja projektu ustawiona na `2.0.4-ui-component-system`.
- `src/main.tsx`: podłączono `src/styles/ui.css`.
- `README.md`: opis Sprintu 2.0.4 i komendy wdrożenia.
- Manifest PWA: nazwa wersji ustawiona na `BG Apiary v2.0.4`.

### Nie zmieniono

- Nie ruszano backendu.
- Nie dodawano bazy danych.
- Nie przebudowywano dashboardu.
- Nie usuwano istniejących funkcji.

## BG Apiary v2.0.3 - Sprint 2.0.3 Dashboard v2

### Dodano

- Nowy dashboard mobile-first.
- Karty statystyk dla uli, zadań, alertów i ostatniego przeglądu.
- Panel szybkich akcji.
- Panel stanu pasieki.
- Widget pogody i pożytku jako UI placeholder.
- Sekcję ostatnich przeglądów.
- Sekcję najbliższych prac.
- Komponenty dashboardu w `src/components/dashboard/`.
- Style dashboardu w `src/styles/dashboard-v203.css`.
- Dokumentację `docs/SPRINT_2_0_3_DASHBOARD.md`.

### Zmieniono

- Tytuł aplikacji na `BG Apiary v2.0.3`.
- `package.json`: wersja projektu ustawiona na `2.0.3-dashboard-v2`.
- `DashboardPage.tsx`: przebudowano ekran główny.
- `App.tsx`: przekazano akcje tworzenia do dashboardu.
- `README.md`: opis Sprintu 2.0.3.

### Nie zmieniono

- Nie zmieniano backendu.
- Nie dodawano bazy danych.
- Nie usuwano istniejących funkcji.

## BG Apiary v2.0.1 - Sprint 2.0.1 Branding + Design System

### Dodano

- `public/brand/bg-apiary-logo.svg` - główne logo w wersji jasnej.
- `public/brand/bg-apiary-logo-dark.svg` - główne logo w wersji ciemnej.
- `public/brand/bg-apiary-icon.svg` - ikona aplikacji.
- `public/favicon.svg` - favicon w formacie SVG.
- `public/icons/icon-192.png` - ikona PWA 192x192.
- `public/icons/icon-512.png` - ikona PWA 512x512.
- `src/styles/design-tokens.css` - centralny design system.
- `docs/DESIGN_SYSTEM.md` - dokumentacja systemu wizualnego.
- `docs/SPRINT_2_0_1_BRANDING.md` - dokumentacja Sprintu 2.0.1.

### Zmieniono

- Tytuł aplikacji na `BG Apiary v2.0.1`.
- Manifest PWA: nazwa, opis, theme color, ikony.
- `package.json`: wersja projektu ustawiona na `2.0.1-branding-design-system`.
- `src/main.tsx`: podłączono `design-tokens.css` przed głównym arkuszem stylów.
- `README.md`: opis projektu, status sprintu, komendy i dokumentacja.

### Nie zmieniono

- Nie przebudowywano dashboardu.
- Nie zmieniano logiki aplikacji.
- Nie zmieniano modeli danych.
- Nie dodawano nowych modułów funkcjonalnych.
