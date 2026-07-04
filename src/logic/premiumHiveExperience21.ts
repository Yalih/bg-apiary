export const PREMIUM_HIVE_EXPERIENCE_VERSION = '2.1-hiveexperience';

export const premiumHiveExperienceAreas = [
  'Lista uli',
  'Karty uli',
  'Szczegóły ula',
  'Historia',
  'Hero Header',
  'Matka',
  'Statusy',
  'Nakładki',
  'Timeline',
  'Hero Illustration',
  'Queen Dot',
  'Overlay',
  'Status Badge'
] as const;

export const premiumHiveExperiencePrinciples = {
  noLogicChanges: true,
  dynamicByStrength: true,
  dynamicBySeason: true,
  dynamicByStatus: true,
  premiumHero: true,
  premiumTimeline: true,
  premiumFab: true
} as const;

export function getHiveExperienceStatus(strength: number): 'bardzo-silna' | 'silna' | 'średnia' | 'słaba' | 'bardzo-słaba' {
  if (strength >= 9) return 'bardzo-silna';
  if (strength >= 7) return 'silna';
  if (strength >= 5) return 'średnia';
  if (strength >= 3) return 'słaba';
  return 'bardzo-słaba';
}

export function getHiveExperienceVisibleHistory(expanded: boolean): number {
  return expanded ? 24 : 6;
}

export function getHiveExperienceFabActions(): string[] {
  return ['Przegląd', 'Karmienie', 'Matka', 'Zdjęcie', 'Notatka'];
}
