# Sprint 2.0.6 - Theme Mode Switcher

## Cel

Dodać realny, działający system motywów dla BG Apiary: jasny, ciemny i systemowy. Sprint nie rusza backendu ani bazy danych. Tak, wreszcie jedna rzecz naraz, bo chaos też trzeba kiedyś oswoić.

## Zakres wykonany

- Dodano `src/theme.ts` z obsługą preferencji motywu.
- Dodano `src/components/theme/ThemeToggle.tsx`.
- Podłączono `ThemeToggle` w `TopBar`.
- Zapis wyboru motywu działa przez `localStorage` pod kluczem `bg-apiary-theme-preference`.
- Tryb `system` korzysta z `prefers-color-scheme`.
- `main.tsx` aplikuje motyw przed renderem aplikacji.
- `design-tokens.css` rozszerzono o zmienne dla trybu jasnego i ciemnego.
- Poprawiono kontrast layoutu, kart, topbaru, sidebaru, mobile nav i komponentów UI.
- Zaktualizowano wersję do `BG Apiary v2.0.6`.

## Pliki dodane

- `src/theme.ts`
- `src/components/theme/ThemeToggle.tsx`
- `docs/SPRINT_2_0_6_THEME_MODE.md`

## Pliki zmienione

- `src/main.tsx`
- `src/components/navigation/TopBar.tsx`
- `src/styles/design-tokens.css`
- `src/styles/layout.css`
- `src/styles/ui.css`
- `index.html`
- `package.json`
- `public/manifest.webmanifest`
- `README.md`
- `CHANGELOG.md`
- `docs/CHANGELOG.md`

## Testy

```bash
npm install
npm run build
```

## Kryteria akceptacji

- Przełącznik motywu jest widoczny w topbarze.
- Kliknięcie przełącza kolejno: jasny → ciemny → systemowy.
- Wybór zostaje zapisany po odświeżeniu strony.
- Tryb systemowy reaguje na ustawienie systemu operacyjnego.
- Build przechodzi bez błędów.
