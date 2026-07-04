# Wdrożenie paczki grafik BG APIARY do aplikacji

Ta paczka nie zmienia logiki aplikacji. Zawiera gotowe pliki do wdrożenia:

- `src/assets/bgapiary/icons/`
- `src/assets/bgapiary/illustrations/`
- `src/components/bgapiary/`
- `src/logic/bgApiaryAssets.ts`
- `src/styles/bgApiaryAssetPack.css`

## Krok 1

Skopiuj katalog `src/` z tej paczki do katalogu aplikacji BgApiary.

Możesz użyć skryptu:

```bash
node scripts/install-bgapiary-assets.mjs /ścieżka/do/BgApiary/src
```

## Krok 2

W głównym pliku stylów aplikacji dodaj:

```ts
import './styles/bgApiaryAssetPack.css';
```

albo w CSS:

```css
@import './styles/bgApiaryAssetPack.css';
```

## Krok 3

Użyj ikon:

```tsx
import { BgApiaryIcon } from './components/bgapiary/BgApiaryIcon';

<BgApiaryIcon name="pogoda" label="Pogoda" />
```

## Krok 4

Użyj ilustracji uli:

```tsx
import { BgApiaryHiveIllustration } from './components/bgapiary/BgApiaryIllustration';

<BgApiaryHiveIllustration strength={hive.strength} />
```

## Krok 5

Podmień obecną grafikę kart uli na:

```tsx
import { BgApiaryHiveAssetCard } from './components/bgapiary/BgApiaryPremiumCards';

<BgApiaryHiveAssetCard hive={hive} onOpen={() => onOpenHive(hive.id)} />
```

## Co zawiera paczka

- SVG ikon,
- SVG ilustracji,
- komponenty React,
- mapowanie assetów,
- CSS,
- referencje graficzne,
- dokumentację.

## Czego paczka nie robi

- nie zmienia modeli danych,
- nie zmienia localStorage,
- nie zmienia backupu,
- nie dodaje backendu,
- nie generuje nowych grafik.
