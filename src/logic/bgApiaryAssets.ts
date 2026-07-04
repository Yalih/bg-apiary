import { getQueenMarkingByYear } from './queenMarking20';

export const BG_APIARY_ASSET_PIPELINE_VERSION = '2.0-premium-asset-pipeline';

export type HiveVisualState =
  | 'bardzo_silna'
  | 'silna'
  | 'srednia'
  | 'slaba'
  | 'bardzo_slaba'
  | 'odklad'
  | 'nowy_pakiet'
  | 'rodzina_produkcyjna'
  | 'rodzina_rojowa'
  | 'po_miodobraniu'
  | 'bez_matki'
  | 'leczenie'
  | 'alarm_zdrowotny'
  | 'kwarantanna'
  | 'zimowanie'
  | 'variant_hero_ul';

export type HiveAssetSize = 'hero' | 'card' | 'list' | 'mini32' | 'mini48' | 'mini64' | 'mini96';
export type SeasonAsset = 'spring' | 'summer' | 'autumn' | 'winter';

export const HIVE_ASSET_FILES: Record<HiveVisualState, string> = {
  bardzo_silna: 'bardzo_silna.png',
  silna: 'silna.png',
  srednia: 'srednia.png',
  slaba: 'slaba.png',
  bardzo_slaba: 'bardzo_slaba.png',
  odklad: 'odklad.png',
  nowy_pakiet: 'nowy_pakiet.png',
  rodzina_produkcyjna: 'rodzina_produkcyjna.png',
  rodzina_rojowa: 'rodzina_rojowa.png',
  po_miodobraniu: 'po_miodobraniu.png',
  bez_matki: 'bez_matki.png',
  leczenie: 'leczenie.png',
  alarm_zdrowotny: 'alarm_zdrowotny.png',
  kwarantanna: 'kwarantanna.png',
  zimowanie: 'zimowanie.png',
  variant_hero_ul: 'variant_hero_ul.png'
};

export type HiveOverlay =
  | 'ok'
  | 'uwaga'
  | 'alarm'
  | 'leczenie'
  | 'warroza'
  | 'przeglad'
  | 'nowa_matka'
  | 'brak_matki'
  | 'karmienie'
  | 'pozytek'
  | 'miod'
  | 'transport'
  | 'synchronizacja'
  | 'backup'
  | 'zimowanie';

export function getHiveAsset(input: {
  strength: number;
  queenPresent?: boolean;
  treatment?: boolean;
  alarm?: boolean;
  quarantine?: boolean;
  winter?: boolean;
  newPackage?: boolean;
  size?: HiveAssetSize;
}): string {
  const state = getHiveVisualState(input);
  const file = HIVE_ASSET_FILES[state];
  const size = input.size ?? 'card';

  if (size.startsWith('mini')) {
    const px = size.replace('mini', '');
    return `/assets/bgapiary/hive/mini/${px}/${file}`;
  }

  return `/assets/bgapiary/hive/${size}/${file}`;
}

export function getHeroHive(input: Omit<Parameters<typeof getHiveAsset>[0], 'size'>): string {
  return getHiveAsset({ ...input, size: 'hero' });
}

export function getMiniHive(input: Omit<Parameters<typeof getHiveAsset>[0], 'size'>, px: 32 | 48 | 64 | 96 = 64): string {
  return getHiveAsset({ ...input, size: `mini${px}` as HiveAssetSize });
}

export function getSeasonHive(input: {
  strength: number;
  date?: Date | string;
  queenPresent?: boolean;
  treatment?: boolean;
  alarm?: boolean;
  quarantine?: boolean;
  winter?: boolean;
  newPackage?: boolean;
}): string {
  const season = getSeasonFromDate(input.date);
  const state = getHiveVisualState({ ...input, winter: input.winter || season === 'winter' });
  return `/assets/bgapiary/hive/seasonal/${season}/${HIVE_ASSET_FILES[state]}`;
}

export function getHiveOverlay(input: {
  strength?: number;
  queenPresent?: boolean;
  alarm?: boolean;
  treatment?: boolean;
  winter?: boolean;
  reviewDue?: boolean;
}): string {
  const name = getHiveOverlayName(input);
  return `/assets/bgapiary/overlays/${name}.png`;
}

export function getHiveOverlayName(input: {
  strength?: number;
  queenPresent?: boolean;
  alarm?: boolean;
  treatment?: boolean;
  winter?: boolean;
  reviewDue?: boolean;
}): HiveOverlay {
  if (input.alarm) return 'alarm';
  if (input.treatment) return 'leczenie';
  if (input.winter) return 'zimowanie';
  if (input.queenPresent === false) return 'brak_matki';
  if (input.reviewDue) return 'przeglad';
  if ((input.strength ?? 5) >= 7) return 'ok';
  if ((input.strength ?? 5) >= 4) return 'uwaga';
  return 'alarm';
}

export function getQueenBase(): string {
  return '/assets/bgapiary/queen/base/queen_base.png';
}

export function getQueenDot(year: number): { color: string; className: string; asset: string; hex: string } {
  const marking = getQueenMarkingByYear(year);
  const dotFile = {
    biała: 'white',
    żółta: 'yellow',
    czerwona: 'red',
    zielona: 'green',
    niebieska: 'blue'
  }[marking.color];

  return {
    color: marking.color,
    className: marking.cssClass,
    hex: marking.hex,
    asset: `/assets/bgapiary/queen/dots/${dotFile}.png`
  };
}

export function getWeatherAsset(code: string = 'sun'): string {
  const normalized = code.toLowerCase();
  if (normalized.includes('rain') || normalized.includes('deszcz')) return '/assets/bgapiary/weather/pogoda-deszcz.svg';
  if (normalized.includes('wind') || normalized.includes('wiatr')) return '/assets/bgapiary/weather/pogoda-wiatr.svg';
  if (normalized.includes('cloud') || normalized.includes('chmur')) return '/assets/bgapiary/weather/pogoda-zachmurzenie.svg';
  return '/assets/bgapiary/weather/pogoda-slonce.svg';
}

export function getNectarAsset(name: string = 'lipa'): string {
  const normalized = name.toLowerCase();
  if (normalized.includes('akac')) return '/assets/bgapiary/nectar/pozytek-akacja.svg';
  if (normalized.includes('rzep')) return '/assets/bgapiary/nectar/pozytek-rzepak.svg';
  if (normalized.includes('facel')) return '/assets/bgapiary/nectar/pozytek-facelia.svg';
  if (normalized.includes('gry')) return '/assets/bgapiary/nectar/pozytek-gryka.svg';
  if (normalized.includes('wrz')) return '/assets/bgapiary/nectar/pozytek-wrzos.svg';
  return '/assets/bgapiary/nectar/pozytek-lipa.svg';
}

export function getHiveVisualState(input: {
  strength: number;
  queenPresent?: boolean;
  treatment?: boolean;
  alarm?: boolean;
  quarantine?: boolean;
  winter?: boolean;
  newPackage?: boolean;
}): HiveVisualState {
  if (input.alarm) return 'alarm_zdrowotny';
  if (input.treatment) return 'leczenie';
  if (input.quarantine) return 'kwarantanna';
  if (input.winter) return 'zimowanie';
  if (input.newPackage) return 'nowy_pakiet';
  if (input.queenPresent === false) return 'bez_matki';
  if (input.strength >= 9) return 'bardzo_silna';
  if (input.strength >= 7) return 'silna';
  if (input.strength >= 5) return 'srednia';
  if (input.strength >= 3) return 'slaba';
  return 'bardzo_slaba';
}

export function getSeasonFromDate(date?: Date | string): SeasonAsset {
  const d = date ? new Date(date) : new Date();
  const month = d.getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}


// Backward compatibility layer for older visual components/tests.
// New UI should use the pipeline functions above.
export const BG_APIARY_ICONS = {
  pulpit: '/assets/bgapiary/icons/01_pulpit.svg',
  ule: '/assets/bgapiary/icons/02_ule.svg',
  pasieki: '/assets/bgapiary/icons/03_pasieki.svg',
  matka: '/assets/bgapiary/icons/04_matka.svg',
  czerw: '/assets/bgapiary/icons/05_czerw.svg',
  ramki: '/assets/bgapiary/icons/06_ramki.svg',
  zapasy: '/assets/bgapiary/icons/07_zapasy.svg',
  temperatura: '/assets/bgapiary/icons/08_temperatura.svg',
  zdrowie: '/assets/bgapiary/icons/09_zdrowie.svg',
  warroza: '/assets/bgapiary/icons/10_warroza.svg',
  leczenie: '/assets/bgapiary/icons/11_leczenie.svg',
  pogoda: '/assets/bgapiary/icons/12_pogoda.svg',
  pozytek: '/assets/bgapiary/icons/13_pozytek.svg',
  magazyn: '/assets/bgapiary/icons/14_magazyn.svg',
  miod: '/assets/bgapiary/icons/15_miod.svg',
  przeglady: '/assets/bgapiary/icons/38_przeglady.svg',
  raporty: '/assets/bgapiary/icons/17_raporty.svg',
  planSezonu: '/assets/bgapiary/icons/18_plan-sezonu.svg',
  zadania: '/assets/bgapiary/icons/19_zadania.svg',
  historia: '/assets/bgapiary/icons/20_historia.svg',
  zdjecia: '/assets/bgapiary/icons/21_zdjecia.svg',
  notatki: '/assets/bgapiary/icons/22_notatki.svg',
  synchronizacja: '/assets/bgapiary/icons/23_synchronizacja.svg',
  backup: '/assets/bgapiary/icons/24_backup.svg',
  konto: '/assets/bgapiary/icons/25_konto.svg',
  alarmy: '/assets/bgapiary/icons/26_alarmy.svg',
  wiecej: '/assets/bgapiary/icons/27_wiecej.svg'
} as const;

export const BG_APIARY_ICON_ALIASES = BG_APIARY_ICONS;
export type BgApiaryIconName = keyof typeof BG_APIARY_ICONS;
export type BgApiaryStableIconName = keyof typeof BG_APIARY_ICON_ALIASES;

export const BG_APIARY_ILLUSTRATIONS = {
  ulBardzoSilny: '/assets/bgapiary/hive/card/bardzo_silna.png',
  ulSilny: '/assets/bgapiary/hive/card/silna.png',
  ulSredni: '/assets/bgapiary/hive/card/srednia.png',
  ulSlaby: '/assets/bgapiary/hive/card/slaba.png',
  ulBardzoSlaby: '/assets/bgapiary/hive/card/bardzo_slaba.png',
  pozytekLipa: getNectarAsset('lipa')
} as const;

export type BgApiaryIllustrationName = keyof typeof BG_APIARY_ILLUSTRATIONS;

export function getHiveIllustrationByStrength(strength: number): BgApiaryIllustrationName {
  if (strength >= 9) return 'ulBardzoSilny';
  if (strength >= 7) return 'ulSilny';
  if (strength >= 5) return 'ulSredni';
  if (strength >= 3) return 'ulSlaby';
  return 'ulBardzoSlaby';
}
