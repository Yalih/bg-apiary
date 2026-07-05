# BG Apiary v2.6.1 - Mobile navigation and Notes layout fix

## Scope
This fix addresses visual issues reported on the mobile Hive Details screen.

## Fixed
- Removed the feeling of duplicated bottom navigation by changing the hive quick actions bar from a sticky/fixed bottom element into an in-flow action section.
- Prevented quick actions from overlapping the Notes tab content and empty-state action button.
- Added safe bottom spacing so the global mobile navigation remains usable without covering content.
- Improved quick action wrapping on small screens.
- Aligned tile icons inside hive detail cards.

## Files changed
- `src/styles/fix-2-6-1-navigation.css`
- `src/main.tsx`
- `index.html`
- `package.json`
- `package-lock.json`
- `public/manifest.webmanifest`
- `CHANGELOG.md`
- `README.md`
- `docs/FIX_2_6_1_MOBILE_NAV_AND_NOTES.md`

## Verification
Run:

```bash
npm install
npm run build
```

Then verify on mobile:
- Hive Details / Overview
- Hive Details / Notes
- bottom global navigation
- quick action section
