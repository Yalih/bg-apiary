export const HIVE_DETAILS_ICON_POLISH_VERSION = '2.1-hivedetails-iconpolish';

export const hiveDetailsIconPolishRules = {
  heroWhiteBlobRemoved: true,
  heroHiveCentered: true,
  heroHiveScalePercent: 22,
  queenDotOnThorax: true,
  tileIconSizePx: 32,
  tileIconColor: '#0F3D2E',
  tileIconBackground: '#F7F2E8',
  quickActionMinWidthPx: 108,
  mobileSafeBottomPx: 132
} as const;

export const hiveDetailsPolishedTiles = [
  'Matka',
  'Czerw',
  'Zapasy',
  'Temperatura',
  'Zdrowie',
  'Pożytek',
  'Magazyn',
  'Plan'
] as const;

export const hiveDetailsQuickActions = [
  'Przegląd',
  'Karmienie',
  'Matka',
  'Zdjęcie',
  'Notatka'
] as const;

export function getQueenThoraxDotPosition() {
  return { left: '50%', top: '43%' } as const;
}
