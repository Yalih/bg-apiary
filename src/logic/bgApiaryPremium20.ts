export const BG_APIARY_PREMIUM_VERSION = '2.0 BG Apiary Premium';

export const BG_APIARY_COLORS = {
  deepGreen: '#0F3D2E',
  forestGreen: '#1E5B43',
  honeyGold: '#A57C2E',
  warmWhite: '#F5F7F5',
  sand: '#EAE6DA',
  pureWhite: '#FFFFFF',
  alertRed: '#B42318'
} as const;

export const BG_APIARY_NAV = ['Pulpit', 'Ule', '+', 'Plan', 'Więcej'] as const;

export const BG_APIARY_QUICK_ACCESS = [
  { label: 'Przeglądy', icon: '▣' },
  { label: 'Rodziny', icon: '▤' },
  { label: 'Plan prac', icon: '□' },
  { label: 'Notatki', icon: '✎' },
  { label: 'Raporty', icon: '▥' },
  { label: 'Pogoda', icon: '☁' }
] as const;

export const BG_APIARY_CLASSES = [
  'bgapiary-shell',
  'bgapiary-brand-card',
  'bgapiary-hero',
  'bgapiary-today-card',
  'bgapiary-quick-grid',
  'bgapiary-hive-card',
  'bgapiary-progress',
  'bgapiary-bottom-nav',
  'bgapiary-gold-plus',
  'bgapiary-timeline',
  'bgapiary-honey-card'
] as const;

export function bgApiaryStrengthLabel(strength: number): string {
  if (strength >= 9) return 'Bardzo silna rodzina';
  if (strength >= 6) return 'Średnia rodzina';
  if (strength >= 4) return 'Do obserwacji';
  return 'Słaba rodzina';
}

export function bgApiaryStrengthPercent(strength: number): number {
  return Math.max(0, Math.min(100, Math.round(strength * 10)));
}

export function bgApiaryHiveTone(strength: number): 'ok' | 'warning' | 'alert' {
  if (strength >= 6) return 'ok';
  if (strength >= 4) return 'warning';
  return 'alert';
}
