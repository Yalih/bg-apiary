import { getQueenMarkingByYear } from './queenMarking20';

export const ASSET_MANAGER_VERSION = '2.1-hivevisualoverhaul';

export type HiveState21 =
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
  | 'zimowanie';

export type HiveAssetSize21 = 'hero' | 'card' | 'list' | 'mini32' | 'mini48' | 'mini64' | 'mini96';
export type Season21 = 'spring' | 'summer' | 'autumn' | 'winter';

export function getHiveState(input: {
  strength: number;
  queenPresent?: boolean;
  alarm?: boolean;
  treatment?: boolean;
  quarantine?: boolean;
  winter?: boolean;
  newPackage?: boolean;
}): HiveState21 {
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

export function getHiveAsset(input: {
  strength: number;
  queenPresent?: boolean;
  alarm?: boolean;
  treatment?: boolean;
  quarantine?: boolean;
  winter?: boolean;
  newPackage?: boolean;
  size?: HiveAssetSize21;
}): string {
  const state = getHiveState(input);
  const size = input.size ?? 'card';
  if (size.startsWith('mini')) {
    return `/assets/bgapiary21v2/hive/mini/${size.replace('mini', '')}/${state}.svg`;
  }
  return `/assets/bgapiary21v2/hive/${size}/${state}.svg`;
}

export function getHeroHive(input: Omit<Parameters<typeof getHiveAsset>[0], 'size'>): string {
  return getHiveAsset({ ...input, size: 'hero' });
}

export function getMiniHive(input: Omit<Parameters<typeof getHiveAsset>[0], 'size'>, px: 32 | 48 | 64 | 96 = 64): string {
  return getHiveAsset({ ...input, size: `mini${px}` as HiveAssetSize21 });
}

export function getSeasonFromDate(date?: Date | string): Season21 {
  const d = date ? new Date(date) : new Date();
  const m = d.getMonth() + 1;
  if (m >= 3 && m <= 5) return 'spring';
  if (m >= 6 && m <= 8) return 'summer';
  if (m >= 9 && m <= 11) return 'autumn';
  return 'winter';
}

export function getSeasonHive(input: {
  strength: number;
  date?: Date | string;
  queenPresent?: boolean;
  alarm?: boolean;
  treatment?: boolean;
  quarantine?: boolean;
  winter?: boolean;
  newPackage?: boolean;
}): string {
  const season = getSeasonFromDate(input.date);
  const state = getHiveState({ ...input, winter: input.winter || season === 'winter' });
  return `/assets/bgapiary21v2/hive/seasonal/${season}/${state}.svg`;
}

export type Overlay21 = 'ok' | 'uwaga' | 'alarm' | 'leczenie' | 'warroza' | 'przeglad' | 'nowa_matka' | 'brak_matki' | 'karmienie' | 'pozytek' | 'miod' | 'transport' | 'synchronizacja' | 'backup' | 'zimowanie';

export function getOverlay(input: {
  strength?: number;
  queenPresent?: boolean;
  alarm?: boolean;
  treatment?: boolean;
  winter?: boolean;
  reviewDue?: boolean;
}): string {
  let name: Overlay21 = 'ok';
  if (input.alarm) name = 'alarm';
  else if (input.treatment) name = 'leczenie';
  else if (input.winter) name = 'zimowanie';
  else if (input.queenPresent === false) name = 'brak_matki';
  else if (input.reviewDue) name = 'przeglad';
  else if ((input.strength ?? 5) < 4) name = 'alarm';
  else if ((input.strength ?? 5) < 7) name = 'uwaga';
  return `/assets/bgapiary21v2/overlay/${name}.svg`;
}

export function getQueenAsset(): string {
  return '/assets/bgapiary21v2/queen/base/queen_base.svg';
}

export function getQueenDot(year: number) {
  const marking = getQueenMarkingByYear(year);
  const dotName = {
    biała: 'white',
    żółta: 'yellow',
    czerwona: 'red',
    zielona: 'green',
    niebieska: 'blue'
  }[marking.color];
  return {
    ...marking,
    asset: `/assets/bgapiary21v2/queen/dots/${dotName}.svg`
  };
}

export function getWeatherAsset(type = 'sun'): string {
  const t = type.toLowerCase();
  if (t.includes('rain') || t.includes('deszcz')) return '/assets/bgapiary21/weather/pogoda-deszcz.svg';
  if (t.includes('wind') || t.includes('wiatr')) return '/assets/bgapiary21/weather/pogoda-wiatr.svg';
  if (t.includes('cloud') || t.includes('chmur')) return '/assets/bgapiary21/weather/pogoda-zachmurzenie.svg';
  return '/assets/bgapiary21/weather/pogoda-slonce.svg';
}

export function getNectarAsset(name = 'lipa'): string {
  const n = name.toLowerCase();
  if (n.includes('akac')) return '/assets/bgapiary21/nectar/pozytek-akacja.svg';
  if (n.includes('rzep')) return '/assets/bgapiary21/nectar/pozytek-rzepak.svg';
  if (n.includes('facel')) return '/assets/bgapiary21/nectar/pozytek-facelia.svg';
  if (n.includes('gry')) return '/assets/bgapiary21/nectar/pozytek-gryka.svg';
  if (n.includes('wrz')) return '/assets/bgapiary21/nectar/pozytek-wrzos.svg';
  return '/assets/bgapiary21/nectar/pozytek-lipa.svg';
}
