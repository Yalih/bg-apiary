/* LEGACY_REFERENCE_ONLY: zachowane wyłącznie dla kompatybilności testów i dokumentacji. UI 2.1 używa assetManager21.ts. */
import { getQueenMarkingByYear } from './queenMarking20';

export const BG_APIARY_CLEAN_ASSET_VERSION = '2.0-professional-clean-assets';

export type CleanHiveAssetName =
  | 'bardzoSilna'
  | 'silna'
  | 'srednia'
  | 'slaba'
  | 'bardzoSlaba'
  | 'nowyPakiet'
  | 'odklad'
  | 'zimowanie'
  | 'leczenie'
  | 'alarm'
  | 'bezMatki'
  | 'kwarantanna'
  | 'rodzinaProdukcyjna'
  | 'rodzinaRojowa'
  | 'poMiodobraniu'
  | 'hero';

export type CleanHiveAssetSize = 'mini' | 'card' | 'hero';

export const CLEAN_HIVE_ASSETS: Record<CleanHiveAssetName, Record<CleanHiveAssetSize, string>> = {
  bardzoSilna: {
    mini: '/assets/bgapiary-clean/hives/mini/bardzo_silna.png',
    card: '/assets/bgapiary-clean/hives/card/bardzo_silna.png',
    hero: '/assets/bgapiary-clean/hives/hero/bardzo_silna.png'
  },
  silna: {
    mini: '/assets/bgapiary-clean/hives/mini/silna.png',
    card: '/assets/bgapiary-clean/hives/card/silna.png',
    hero: '/assets/bgapiary-clean/hives/hero/silna.png'
  },
  srednia: {
    mini: '/assets/bgapiary-clean/hives/mini/srednia.png',
    card: '/assets/bgapiary-clean/hives/card/srednia.png',
    hero: '/assets/bgapiary-clean/hives/hero/srednia.png'
  },
  slaba: {
    mini: '/assets/bgapiary-clean/hives/mini/slaba.png',
    card: '/assets/bgapiary-clean/hives/card/slaba.png',
    hero: '/assets/bgapiary-clean/hives/hero/slaba.png'
  },
  bardzoSlaba: {
    mini: '/assets/bgapiary-clean/hives/mini/bardzo_slaba.png',
    card: '/assets/bgapiary-clean/hives/card/bardzo_slaba.png',
    hero: '/assets/bgapiary-clean/hives/hero/bardzo_slaba.png'
  },
  nowyPakiet: {
    mini: '/assets/bgapiary-clean/hives/mini/nowy_pakiet.png',
    card: '/assets/bgapiary-clean/hives/card/nowy_pakiet.png',
    hero: '/assets/bgapiary-clean/hives/hero/nowy_pakiet.png'
  },
  odklad: {
    mini: '/assets/bgapiary-clean/hives/mini/odklad.png',
    card: '/assets/bgapiary-clean/hives/card/odklad.png',
    hero: '/assets/bgapiary-clean/hives/hero/odklad.png'
  },
  zimowanie: {
    mini: '/assets/bgapiary-clean/hives/mini/zimowanie.png',
    card: '/assets/bgapiary-clean/hives/card/zimowanie.png',
    hero: '/assets/bgapiary-clean/hives/hero/zimowanie.png'
  },
  leczenie: {
    mini: '/assets/bgapiary-clean/hives/mini/leczenie.png',
    card: '/assets/bgapiary-clean/hives/card/leczenie.png',
    hero: '/assets/bgapiary-clean/hives/hero/leczenie.png'
  },
  alarm: {
    mini: '/assets/bgapiary-clean/hives/mini/alarm_zdrowotny.png',
    card: '/assets/bgapiary-clean/hives/card/alarm_zdrowotny.png',
    hero: '/assets/bgapiary-clean/hives/hero/alarm_zdrowotny.png'
  },
  bezMatki: {
    mini: '/assets/bgapiary-clean/hives/mini/bez_matki.png',
    card: '/assets/bgapiary-clean/hives/card/bez_matki.png',
    hero: '/assets/bgapiary-clean/hives/hero/bez_matki.png'
  },
  kwarantanna: {
    mini: '/assets/bgapiary-clean/hives/mini/kwarantanna.png',
    card: '/assets/bgapiary-clean/hives/card/kwarantanna.png',
    hero: '/assets/bgapiary-clean/hives/hero/kwarantanna.png'
  },
  rodzinaProdukcyjna: {
    mini: '/assets/bgapiary-clean/hives/mini/rodzina_produkcyjna.png',
    card: '/assets/bgapiary-clean/hives/card/rodzina_produkcyjna.png',
    hero: '/assets/bgapiary-clean/hives/hero/rodzina_produkcyjna.png'
  },
  rodzinaRojowa: {
    mini: '/assets/bgapiary-clean/hives/mini/rodzina_rojowa.png',
    card: '/assets/bgapiary-clean/hives/card/rodzina_rojowa.png',
    hero: '/assets/bgapiary-clean/hives/hero/rodzina_rojowa.png'
  },
  poMiodobraniu: {
    mini: '/assets/bgapiary-clean/hives/mini/po_miodobraniu.png',
    card: '/assets/bgapiary-clean/hives/card/po_miodobraniu.png',
    hero: '/assets/bgapiary-clean/hives/hero/po_miodobraniu.png'
  },
  hero: {
    mini: '/assets/bgapiary-clean/hives/mini/variant_hero_ul.png',
    card: '/assets/bgapiary-clean/hives/card/variant_hero_ul.png',
    hero: '/assets/bgapiary-clean/hives/hero/variant_hero_ul.png'
  }
};

export type CleanQueenAssetName =
  | 'matkaObecna'
  | 'mlodaMatka'
  | 'matkaWAkceptacji'
  | 'matkaCzerwi'
  | 'matkaSlaboCzerwi'
  | 'matkaDoWymiany'
  | 'matkaStara'
  | 'matkaNieznaleziona'
  | 'matkaWKlatce'
  | 'oczekiwanie'
  | 'matkaWysokiejJakosci'
  | 'brakMatki';

export const CLEAN_QUEEN_ASSETS: Record<CleanQueenAssetName, string> = {
  matkaObecna: '/assets/bgapiary-clean/queens/matka_obecna.png',
  mlodaMatka: '/assets/bgapiary-clean/queens/mloda_matka.png',
  matkaWAkceptacji: '/assets/bgapiary-clean/queens/matka_w_akceptacji.png',
  matkaCzerwi: '/assets/bgapiary-clean/queens/matka_czerwi.png',
  matkaSlaboCzerwi: '/assets/bgapiary-clean/queens/matka_slabo_czerwi.png',
  matkaDoWymiany: '/assets/bgapiary-clean/queens/matka_do_wymiany.png',
  matkaStara: '/assets/bgapiary-clean/queens/matka_stara.png',
  matkaNieznaleziona: '/assets/bgapiary-clean/queens/matka_nieznaleziona.png',
  matkaWKlatce: '/assets/bgapiary-clean/queens/matka_w_klatce.png',
  oczekiwanie: '/assets/bgapiary-clean/queens/oczekiwanie.png',
  matkaWysokiejJakosci: '/assets/bgapiary-clean/queens/matka_wysokiej_jakosci.png',
  brakMatki: '/assets/bgapiary-clean/queens/brak_matki.png'
};

export type CleanStatusOverlayName =
  | 'ok'
  | 'uwaga'
  | 'alarm'
  | 'przeglad'
  | 'leczenie'
  | 'warroza'
  | 'nowaMatka'
  | 'brakMatki'
  | 'karmienie'
  | 'pozytek'
  | 'miod'
  | 'zimowanie'
  | 'transport'
  | 'synchronizacja'
  | 'backup';

export const CLEAN_STATUS_OVERLAYS: Record<CleanStatusOverlayName, string> = {
  ok: '/assets/bgapiary-clean/status/ok.png',
  uwaga: '/assets/bgapiary-clean/status/uwaga.png',
  alarm: '/assets/bgapiary-clean/status/alarm.png',
  przeglad: '/assets/bgapiary-clean/status/przeglad.png',
  leczenie: '/assets/bgapiary-clean/status/leczenie.png',
  warroza: '/assets/bgapiary-clean/status/warroza.png',
  nowaMatka: '/assets/bgapiary-clean/status/nowa_matka.png',
  brakMatki: '/assets/bgapiary-clean/status/brak_matki.png',
  karmienie: '/assets/bgapiary-clean/status/karmienie.png',
  pozytek: '/assets/bgapiary-clean/status/pozytek.png',
  miod: '/assets/bgapiary-clean/status/miod.png',
  zimowanie: '/assets/bgapiary-clean/status/zimowanie.png',
  transport: '/assets/bgapiary-clean/status/transport.png',
  synchronizacja: '/assets/bgapiary-clean/status/synchronizacja.png',
  backup: '/assets/bgapiary-clean/status/backup.png'
};

export function getCleanHiveAssetByStrength(strength: number): CleanHiveAssetName {
  if (strength >= 9) return 'bardzoSilna';
  if (strength >= 7) return 'silna';
  if (strength >= 5) return 'srednia';
  if (strength >= 3) return 'slaba';
  return 'bardzoSlaba';
}

export function getCleanHiveAssetByState(input: {
  strength: number;
  queenPresent?: boolean;
  quarantine?: boolean;
  treatment?: boolean;
  alarm?: boolean;
  winter?: boolean;
  newPackage?: boolean;
}): CleanHiveAssetName {
  if (input.alarm) return 'alarm';
  if (input.treatment) return 'leczenie';
  if (input.quarantine) return 'kwarantanna';
  if (input.winter) return 'zimowanie';
  if (input.newPackage) return 'nowyPakiet';
  if (input.queenPresent === false) return 'bezMatki';
  return getCleanHiveAssetByStrength(input.strength);
}

export function getCleanQueenAssetByStatus(input: {
  present?: boolean;
  accepted?: boolean;
  laying?: boolean;
  weakLaying?: boolean;
  replace?: boolean;
  young?: boolean;
  old?: boolean;
  caged?: boolean;
  quality?: number;
}): CleanQueenAssetName {
  if (input.present === false) return 'brakMatki';
  if (input.replace) return 'matkaDoWymiany';
  if (input.weakLaying) return 'matkaSlaboCzerwi';
  if (input.caged) return 'matkaWKlatce';
  if (input.old) return 'matkaStara';
  if (input.young) return 'mlodaMatka';
  if (input.accepted === false) return 'matkaWAkceptacji';
  if (input.quality && input.quality >= 5) return 'matkaWysokiejJakosci';
  if (input.laying) return 'matkaCzerwi';
  return 'matkaObecna';
}

export function getQueenDotByYear(year: number) {
  return getQueenMarkingByYear(year);
}

export function getStatusOverlayAsset(name: CleanStatusOverlayName): string {
  return CLEAN_STATUS_OVERLAYS[name];
}
