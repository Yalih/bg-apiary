# Sprint 2.0.1 - Branding + Design System

## Cel

Realnie wprowadzić fundament identyfikacji wizualnej BG Apiary bez udawania przebudowy całej aplikacji. Zakres tego sprintu to branding, logo, ikony PWA, favicon, design tokens i dokumentacja.

## Wersja

- Sprint: **2.0.1**
- Aplikacja: **BG Apiary v2.0.1**

## Zrealizowane pliki

### Branding

- `public/brand/bg-apiary-logo.svg`
- `public/brand/bg-apiary-logo-dark.svg`
- `public/brand/bg-apiary-icon.svg`
- `public/favicon.svg`
- `public/icons/icon-192.png`
- `public/icons/icon-512.png`

### Design system

- `src/styles/design-tokens.css`
- import w `src/main.tsx`

### Dokumentacja

- `README.md`
- `CHANGELOG.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/SPRINT_2_0_1_BRANDING.md`

### Konfiguracja aplikacji

- `index.html`
- `public/manifest.webmanifest`
- `package.json`

## Kryteria akceptacji

- Logo istnieje w realnych plikach SVG.
- Ikony PWA istnieją w realnych plikach PNG.
- Favicon SVG jest podłączony w `index.html`.
- Manifest PWA odwołuje się do ikon 192x192 i 512x512.
- Design system jest podłączony do aplikacji.
- Build produkcyjny przechodzi.

## Celowo nie wykonano

- Nie przebudowano dashboardu.
- Nie zmieniono układu ekranów.
- Nie dodano nowych funkcji.
- Nie zmieniono modeli danych.

## Komendy wdrożenia

```bash
git add .
git commit -m "Sprint 2.0.1 - branding and design system"
git push
```
