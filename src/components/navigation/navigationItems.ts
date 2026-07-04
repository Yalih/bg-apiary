import type { View } from '../../App';

export interface NavigationItem {
  view: View;
  label: string;
  shortLabel?: string;
  icon: string;
  description: string;
}

export const primaryNavigationItems: NavigationItem[] = [
  { view: 'dashboard', label: 'Pulpit', shortLabel: 'Pulpit', icon: '⌂', description: 'Najważniejsze informacje z pasieki' },
  { view: 'apiaries', label: 'Pasieki', shortLabel: 'Pasieki', icon: '⬢', description: 'Lokalizacje i ule' },
  { view: 'workCenter', label: 'Praca', shortLabel: 'Praca', icon: '✓', description: 'Zadania i obchody' },
  { view: 'calendar', label: 'Kalendarz', shortLabel: 'Plan', icon: '◷', description: 'Terminy i przeglądy' },
  { view: 'more', label: 'Więcej', shortLabel: 'Więcej', icon: '•••', description: 'Raporty, ustawienia i narzędzia' }
];

export const secondaryNavigationItems: NavigationItem[] = [
  { view: 'assistant', label: 'Asystent', icon: '✦', description: 'Podpowiedzi dla rodzin' },
  { view: 'weather', label: 'Pogoda', icon: '☁', description: 'Warunki lotne' },
  { view: 'nectar', label: 'Pożytek', icon: '✺', description: 'Nektarowanie i kalendarz' },
  { view: 'reports', label: 'Raporty', icon: '▤', description: 'Podsumowania pracy' }
];

export function getNavigationTitle(view: View): string {
  const item = [...primaryNavigationItems, ...secondaryNavigationItems].find(nav => nav.view === view);
  if (item) return item.label;

  const fallback: Partial<Record<View, string>> = {
    hives: 'Ule',
    hiveDetails: 'Szczegóły ula',
    tasks: 'Zadania',
    today: 'Dzisiaj',
    createApiary: 'Nowa pasieka',
    createHive: 'Nowy ul',
    createInspection: 'Nowy przegląd',
    createFeeding: 'Karmienie',
    createNote: 'Notatka',
    createTask: 'Nowe zadanie',
    createPhoto: 'Zdjęcie',
    inventory: 'Magazyn',
    honey: 'Miód',
    health: 'Zdrowie rodzin',
    seasonPlan: 'Plan sezonu',
    platform: 'Platforma',
    platform20: 'Platforma',
    apiaryMap: 'Mapa pasieki',
    tour: 'Obchód',
    queenCatalog: 'Matki',
    queenControl: 'Kontrola matki',
    queenReplacement: 'Wymiana matki',
    backup: 'Backup',
    start: 'Start'
  };

  return fallback[view] ?? 'BG Apiary';
}
