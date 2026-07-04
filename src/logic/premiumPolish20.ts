export const PREMIUM_POLISH_VERSION = '2.0 BG Apiary Premium Polish';

export const PREMIUM_POLISH_TABS = ['Przegląd', 'Notatki', 'Historia', 'Zdjęcia'] as const;

export const PREMIUM_POLISH_TILES = ['Matka', 'Czerw', 'Zapasy', 'Temperatura', 'Zdrowie', 'Pożytek', 'Magazyn', 'Plan sezonu'] as const;

export const PREMIUM_POLISH_EMPTY_ACTIONS = ['Dodaj pierwszą pasiekę', 'Dodaj pierwszy ul', 'Dodaj zadanie', 'Importuj kopię zapasową'] as const;

export const PREMIUM_POLISH_CLASSES = [
  'premium-hive-hero',
  'premium-hive-tabs',
  'premium-info-tile',
  'premium-review-card',
  'premium-timeline',
  'premium-photo-grid',
  'premium-floating-actions',
  'premium-hive-list-card'
] as const;

export const PREMIUM_POLISH_ACCESSIBILITY = {
  minTouchTargetPx: 44,
  focusVisible: true,
  ariaForIcons: true,
  noHorizontalScroll: true
} as const;

export function premiumSectionLimit(expanded = false): number {
  return expanded ? 6 : 3;
}
