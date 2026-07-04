/* LEGACY_REFERENCE_ONLY: zachowane wyłącznie dla kompatybilności testów i dokumentacji. UI 2.1 używa assetManager21.ts. */
export const BG_APIARY_REFERENCE_ASSET_VERSION = '2.0-reference-assets-implemented';

export const BG_APIARY_REFERENCE_HIVES = {
  bardzoSilna: '/assets/bgapiary-reference/hives/bardzo_silna.png',
  silna: '/assets/bgapiary-reference/hives/silna.png',
  srednia: '/assets/bgapiary-reference/hives/srednia.png',
  slaba: '/assets/bgapiary-reference/hives/slaba.png',
  bardzoSlaba: '/assets/bgapiary-reference/hives/bardzo_slaba.png',
  nowyPakiet: '/assets/bgapiary-reference/hives/nowy_pakiet.png',
  odklad: '/assets/bgapiary-reference/hives/odklad.png',
  rodzinaProdukcyjna: '/assets/bgapiary-reference/hives/rodzina_produkcyjna.png',
  rodzinaRojowa: '/assets/bgapiary-reference/hives/rodzina_rojowa.png',
  zimowanie: '/assets/bgapiary-reference/hives/zimowanie.png',
  poMiodobraniu: '/assets/bgapiary-reference/hives/po_miodobraniu.png',
  bezMatki: '/assets/bgapiary-reference/hives/bez_matki.png',
  matkaMloda: '/assets/bgapiary-reference/hives/matka_mloda.png',
  matkaStara: '/assets/bgapiary-reference/hives/matka_stara.png',
  kwarantanna: '/assets/bgapiary-reference/hives/kwarantanna.png',
  leczenie: '/assets/bgapiary-reference/hives/leczenie.png',
  alarmZdrowotny: '/assets/bgapiary-reference/hives/alarm_zdrowotny.png',
  hero: '/assets/bgapiary-reference/hives/variant_hero_ul.png'
} as const;

export const BG_APIARY_REFERENCE_QUEENS = {
  matkaObecna: '/assets/bgapiary-reference/queens/matka_obecna.png',
  mlodaMatka: '/assets/bgapiary-reference/queens/mloda_matka.png',
  matkaWAkceptacji: '/assets/bgapiary-reference/queens/matka_w_akceptacji.png',
  matkaCzerwi: '/assets/bgapiary-reference/queens/matka_czerwi.png',
  matkaSlaboCzerwi: '/assets/bgapiary-reference/queens/matka_slabo_czerwi.png',
  matkaDoWymiany: '/assets/bgapiary-reference/queens/matka_do_wymiany.png',
  matkaStara: '/assets/bgapiary-reference/queens/matka_stara.png',
  matkaNieznaleziona: '/assets/bgapiary-reference/queens/matka_nieznaleziona.png',
  matkaWKlatce: '/assets/bgapiary-reference/queens/matka_w_klatce.png',
  oczekiwanie: '/assets/bgapiary-reference/queens/oczekiwanie.png',
  matkaWysokiejJakosci: '/assets/bgapiary-reference/queens/matka_wysokiej_jakosci.png',
  brakMatki: '/assets/bgapiary-reference/queens/brak_matki.png'
} as const;

export const BG_APIARY_REFERENCE_STATUS = {
  ok: '/assets/bgapiary-reference/status/ok.png',
  uwaga: '/assets/bgapiary-reference/status/uwaga.png',
  alarm: '/assets/bgapiary-reference/status/alarm.png',
  przeglad: '/assets/bgapiary-reference/status/przeglad.png',
  leczenie: '/assets/bgapiary-reference/status/leczenie.png',
  warroza: '/assets/bgapiary-reference/status/warroza.png',
  nowaMatka: '/assets/bgapiary-reference/status/nowa_matka.png',
  brakMatki: '/assets/bgapiary-reference/status/brak_matki.png',
  karmienie: '/assets/bgapiary-reference/status/karmienie.png',
  pozytek: '/assets/bgapiary-reference/status/pozytek.png',
  miod: '/assets/bgapiary-reference/status/miod.png',
  zimowanie: '/assets/bgapiary-reference/status/zimowanie.png',
  transport: '/assets/bgapiary-reference/status/transport.png',
  synchronizacja: '/assets/bgapiary-reference/status/synchronizacja.png',
  backup: '/assets/bgapiary-reference/status/backup.png'
} as const;

export type BgApiaryReferenceHiveName = keyof typeof BG_APIARY_REFERENCE_HIVES;
export type BgApiaryReferenceQueenName = keyof typeof BG_APIARY_REFERENCE_QUEENS;
export type BgApiaryReferenceStatusName = keyof typeof BG_APIARY_REFERENCE_STATUS;

export function getReferenceHiveByStrength(strength: number): BgApiaryReferenceHiveName {
  if (strength >= 9) return 'bardzoSilna';
  if (strength >= 7) return 'silna';
  if (strength >= 5) return 'srednia';
  if (strength >= 3) return 'slaba';
  return 'bardzoSlaba';
}

export function getReferenceHiveByState(input: { strength: number; queenPresent?: boolean; quarantine?: boolean; treatment?: boolean; alarm?: boolean; winter?: boolean }): BgApiaryReferenceHiveName {
  if (input.alarm) return 'alarmZdrowotny';
  if (input.treatment) return 'leczenie';
  if (input.quarantine) return 'kwarantanna';
  if (input.winter) return 'zimowanie';
  if (input.queenPresent === false) return 'bezMatki';
  return getReferenceHiveByStrength(input.strength);
}

export function getReferenceQueenByStatus(input: { present?: boolean; accepted?: boolean; laying?: boolean; weakLaying?: boolean; replace?: boolean; young?: boolean; old?: boolean; caged?: boolean; quality?: number }): BgApiaryReferenceQueenName {
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
