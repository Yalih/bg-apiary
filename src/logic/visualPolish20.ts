export const VISUAL_POLISH_VERSION = '2.0 Visual Polish';

export const VISUAL_POLISH_COLORS = {
  deepGreen: '#0F3D2E',
  green: '#1E5B43',
  gold: '#A57C2E',
  cream: '#EAE6DA',
  light: '#F5F7F5',
  graphite: '#102820',
  danger: '#B42318'
} as const;

export const VISUAL_POLISH_SHADOWS = {
  xs: '0 6px 16px rgba(15, 61, 46, .07)',
  sm: '0 12px 28px rgba(15, 61, 46, .10)',
  md: '0 18px 44px rgba(15, 61, 46, .12)',
  lg: '0 28px 68px rgba(15, 61, 46, .18)'
} as const;

export const VISUAL_POLISH_RADIUS = {
  sm: 16,
  md: 22,
  lg: 28,
  xl: 34
} as const;

export const VISUAL_POLISH_SECTIONS = ['Dzisiaj', 'Moje ule', 'Najbliższe prace', 'Alerty', 'Asystent'] as const;

export const VISUAL_POLISH_EMPTY_ACTIONS = [
  'Dodaj pierwszą pasiekę',
  'Dodaj pierwszy ul',
  'Dodaj zadanie',
  'Dodaj zdjęcie',
  'Importuj kopię zapasową'
] as const;

export const VISUAL_POLISH_TOUCH_TARGET = 44;

export function visualPolishSectionLimit(expanded = false): number {
  return expanded ? 6 : 3;
}
