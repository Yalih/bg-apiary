export const BGS_THEME_VERSION = '2.0 BGS Theme';

export const BGS_COLORS = {
  bottleGreen: '#103B28',
  green: '#2F6B52',
  olive: '#A7B38A',
  honeyGold: '#D4A017',
  cream: '#F2F4EC',
  white: '#FFFFFF',
  danger: '#B42318'
} as const;

export const BGS_NAV_LABELS = ['Pulpit', 'Ule', '+', 'Plan', 'Więcej'] as const;

export const BGS_EMPTY_ACTIONS = {
  apiaries: 'Dodaj pierwszą pasiekę',
  hives: 'Dodaj pierwszy ul',
  tasks: 'Dodaj zadanie',
  backup: 'Importuj kopię zapasową'
} as const;

export const BGS_STYLE_CLASSES = [
  'bgs-shell',
  'bgs-card',
  'bgs-hero',
  'bgs-hive-card',
  'bgs-progress',
  'bgs-stat-tile',
  'bgs-timeline',
  'bgs-bottom-nav',
  'bgs-floating-action',
  'bgs-empty-action'
] as const;

export function bgsHiveStrengthPercent(strength: number): number {
  return Math.max(0, Math.min(100, Math.round((strength / 10) * 100)));
}

export function bgsFamilyStatus(strength: number): string {
  if (strength >= 9) return 'Bardzo silna rodzina';
  if (strength >= 6) return 'Średnia rodzina';
  if (strength >= 4) return 'Rodzina do obserwacji';
  return 'Słaba rodzina';
}

export function bgsQueenColorLabel(year?: number): string {
  if (!year) return 'brak danych';
  const labels = ['niebieski', 'biały', 'żółty', 'czerwony', 'zielony'];
  return labels[year % 5];
}
