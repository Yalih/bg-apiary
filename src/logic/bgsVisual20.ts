export const BGS_VISUAL_VERSION = '2.0 BGS Visual Experience';

export const BGS_VISUAL_COLORS = {
  deepGreen: '#0F3D2E',
  accentGreen: '#1E5B43',
  honeyGold: '#A57C2E',
  light: '#F5F7F5',
  cream: '#EAE6DA',
  white: '#FFFFFF'
} as const;

export const BGS_VISUAL_ICONS = {
  dashboard: 'M4 11L12 4l8 7v8a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8z',
  hives: 'M6 8h12v11H6V8zm2-4h8l2 4H6l2-4zm2 8h4m-4 4h4',
  plan: 'M7 4v3m10-3v3M5 8h14M6 6h12a1 1 0 0 1 1 1v12H5V7a1 1 0 0 1 1-1zm3 6h2m3 0h2m-5 4h2',
  notes: 'M6 4h10l2 2v14H6V4zm9 0v4h4M9 10h6M9 14h6M9 18h4',
  reports: 'M5 19h14M7 17V9m5 8V5m5 12v-6',
  weather: 'M12 4v2m0 12v2m8-8h-2M6 12H4m13.7-5.7-1.4 1.4M7.7 16.3l-1.4 1.4m0-11.4 1.4 1.4m8.6 8.6 1.4 1.4M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z',
  nectar: 'M12 3c4 4 6 8 3 12-3 4-8 3-10-1 4 1 7-2 7-6 0 4 3 7 7 6',
  inventory: 'M5 8l7-4 7 4-7 4-7-4zm0 0v8l7 4 7-4V8',
  health: 'M12 21s-7-4.5-7-11a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 6.5-7 11-7 11zm0-9v4m-2-2h4',
  more: 'M6 12h.01M12 12h.01M18 12h.01',
  queen: 'M12 3l3 5h-6l3-5zm-4 8h8l-1 8H9l-1-8zm1-3h6',
  brood: 'M8 8h.01M12 8h.01M16 8h.01M10 12h.01M14 12h.01M8 16h.01M12 16h.01M16 16h.01',
  food: 'M8 7h8v12H8V7zm2-3h4v3h-4V4zm-1 7h6',
  temperature: 'M11 5a1 1 0 0 1 2 0v8.5a3 3 0 1 1-2 0V5z',
  history: 'M12 8v5l3 2M5 12a7 7 0 1 0 2-5M5 4v4h4',
  photos: 'M5 7h3l1-2h6l1 2h3v12H5V7zm7 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'
} as const;

export type HiveIllustrationState = 'strong' | 'medium' | 'weak' | 'quarantine' | 'alert';

export function getHiveIllustrationState(strength: number, quarantine = false, alert = false): HiveIllustrationState {
  if (alert) return 'alert';
  if (quarantine) return 'quarantine';
  if (strength >= 8) return 'strong';
  if (strength >= 5) return 'medium';
  return 'weak';
}

export function iconPath(name: keyof typeof BGS_VISUAL_ICONS): string {
  return BGS_VISUAL_ICONS[name];
}

export const BGS_VISUAL_EMPTY_ACTIONS = ['Dodaj pierwszą pasiekę', 'Dodaj pierwszy ul', 'Dodaj zadanie', 'Importuj kopię zapasową'] as const;

export const BGS_VISUAL_ANIMATIONS = ['fade', 'slide', 'hover', 'active', 'skeleton'] as const;
