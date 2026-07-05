# BG Apiary v2.6

**Smart Beekeeping Management** – aplikacja PWA do zarządzania pasieką, ulami, przeglądami, zadaniami i pracą sezonową.

Wersja **v2.6** zamyka Sprint 2. To finalne wydanie warstwy UI/UX: odświeżony layout, dashboard, branding, dostępność, PWA i poprawki po testach. Bez ruszania backendu i bazy danych, bo robienie wszystkiego naraz to znany sposób na stworzenie cyfrowej ruiny.

## Zakres Sprintu 2

- nowy layout aplikacji: topbar, sidebar desktop i mobile bottom nav,
- dashboard premium z kartami statystyk, zadaniami, stanem rodzin i pogodą/pożytkiem,
- logo, ikony PWA i podstawowy branding,
- poprawki dostępności: skip link, focus states, `aria-current`, lepsza nawigacja,
- podstawowe PWA: manifest, service worker, ekran offline,
- poprawki mobile i reduced motion,
- dokumentacja testów, poprawek i wydania finalnego.

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

## Build produkcyjny

```bash
npm install
npm run build
```

## Wdrożenie

Projekt wdraża się automatycznie przez GitHub Actions po `git push`.

```bash
git add .
git commit -m "Sprint 2 complete"
git push
```

## Najważniejsze dokumenty Sprintu 2

- `docs/SPRINT_2_ANALYSIS.md`
- `docs/SPRINT_2_DESIGN.md`
- `docs/SPRINT_2_IMPLEMENTATION.md`
- `docs/SPRINT_2_TESTS.md`
- `docs/SPRINT_2_5_FIXES.md`
- `docs/SPRINT_2_FINAL_RELEASE.md`

## Następny etap: Sprint 3

Sprint 3 powinien rozpocząć realny moduł **Ule**:

1. lista uli jako osobny, dopracowany ekran,
2. karta ula z kluczowymi danymi,
3. filtry i statusy rodzin,
4. szczegóły ula,
5. historia przeglądów powiązana z ulem.
