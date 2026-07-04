# Sprint 2.0 - UI and Branding Redesign

## Version

- Sprint: **2.0**
- App version: **BG Apiary v2.0**
- Release focus: premium interface, brand identity, dashboard redesign and mobile-first polish.

## 2.0.1 Brand identity

Added a consistent BG Apiary visual identity:

- main logo mark with bee and honeycomb hexagon,
- horizontal logo in dark and light variants,
- stacked logo variant,
- favicon SVG and ICO,
- PWA icons 192x192 and 512x512,
- application placeholders for hive, queen, apiary, empty state, success and error.

Assets live in:

```text
public/brand/
├── logo-mark.svg
├── logo-horizontal-dark.svg
├── logo-horizontal-light.svg
├── logo-stacked.svg
├── favicon.svg
├── favicon.ico
├── icon-192.png
├── icon-512.png
├── icons/
└── placeholders/
```

## 2.0.2 Design system

Introduced premium design tokens:

- dark navy base,
- honey gold primary color,
- white cards and glass surfaces,
- green/orange/red/blue status colors,
- rounded cards,
- soft shadows,
- mobile-first spacing.

## 2.0.3 Dashboard redesign

The dashboard now includes:

- premium hero section,
- BG Apiary v2.0 branding,
- quick stats,
- quick actions,
- weather card,
- nectar card,
- apiary overview,
- top hive strip,
- task panel,
- assistant and sync status panel.

## 2.0.4 Navigation redesign

Added:

- desktop sidebar,
- sticky topbar,
- mobile-friendly existing bottom navigation integration,
- consistent module icons.

## 2.0.5 PWA and favicon

Updated:

- `index.html`,
- `manifest.webmanifest`,
- favicon and app icons.

## Acceptance checks

- `npm install` passes,
- `npm run build` passes,
- app opens locally and on production after `git push`,
- mobile layout remains usable,
- current features remain available.
