import type { View } from '../../App';

export type NavigationItem = {
  view: View;
  label: string;
  description: string;
  icon: string;
};

export const primaryNavigation: NavigationItem[] = [
  { view: 'dashboard', label: 'Dashboard', description: 'Sytuacja pasieki', icon: '⌂' },
  { view: 'apiaries', label: 'Pasieki', description: 'Lokalizacje i ule', icon: '⬡' },
  { view: 'hives', label: 'Ule', description: 'Rodziny i ramki', icon: '▦' },
  { view: 'tasks', label: 'Zadania', description: 'Prace do wykonania', icon: '✓' },
  { view: 'calendar', label: 'Kalendarz', description: 'Plan sezonu', icon: '◷' },
  { view: 'reports', label: 'Raporty', description: 'Wnioski i statystyki', icon: '↗' },
  { view: 'assistant', label: 'Asystent', description: 'Podpowiedzi AI', icon: '✦' },
  { view: 'more', label: 'Więcej', description: 'Ustawienia i narzędzia', icon: '⋯' }
];

export const mobileNavigation: NavigationItem[] = [
  primaryNavigation[0],
  primaryNavigation[1],
  primaryNavigation[3],
  primaryNavigation[5],
  primaryNavigation[7]
];
