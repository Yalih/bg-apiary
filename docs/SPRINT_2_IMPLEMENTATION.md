# Sprint 2.3 – Implementacja redesignu BG Apiary

## Cel
Realna implementacja zaakceptowanego kierunku Sprintu 2: premium branding, nowy layout aplikacji, dashboard v2.3 i fundament design systemu bez ruszania backendu ani modelu danych.

## Zakres wykonany

### Layout
- Dodano `AppLayout` z topbarem, sidebarem desktopowym i dolną nawigacją mobilną.
- Zachowano istniejącą nawigację przez typ `View`, bez wprowadzania routera i bez zmiany danych.
- `AppShell` został przepięty na nowy layout i przyjmuje liczbę uli oraz otwartych zadań.

### Dashboard
- Przebudowano `DashboardPage` na czytelny dashboard v2.3.
- Dodano hero, karty statystyk, szybkie akcje, sekcję najbliższych zadań, stan rodzin, widget pogody/pożytku i ostatni przegląd.
- Zachowano istniejące akcje: otwieranie uli, zadań, kalendarza, pogody, pożytku i kończenie zadań.

### Branding i PWA
- Dodano logo SVG, ikonę brandu i wersję dark.
- Uzupełniono ikony PWA 192/512 PNG.
- Zaktualizowano `manifest.webmanifest` oraz tytuł aplikacji na BG Apiary v2.3.

### Style
- Dodano `src/styles/sprint2.css` z tokenami Sprintu 2, layoutem, dashboardem i responsywnością.
- Nie usunięto wcześniejszych styli, żeby nie zepsuć istniejących ekranów.

## Czego nie ruszano
- Backend: brak zmian.
- Model danych: brak zmian.
- Local storage i logika biznesowa: brak zmian.
- Moduł Ule jako osobny sprint: nie został dodany.

## Kryteria odbioru
- `npm install` przechodzi.
- `npm run build` przechodzi.
- Aplikacja ma widoczną zmianę layoutu i dashboardu.
- Dotychczasowe widoki pozostają dostępne przez menu.
