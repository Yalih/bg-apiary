export const MODULE_THEME = {
  platform: { label: 'Platforma', icon: '🚀', color: 'fiolet' },
  dashboard: { label: 'Panel właściciela', icon: '🏠', color: 'granat' },
  season: { label: 'Plan sezonu', icon: '📅', color: 'granat' },
  health: { label: 'Zdrowie', icon: '❤️', color: 'czerwony' },
  honey: { label: 'Miód', icon: '🍯', color: 'złoty' },
  inventory: { label: 'Magazyn', icon: '📦', color: 'bursztyn' },
  assistant: { label: 'Asystent', icon: '🤖', color: 'fiolet' },
  reports: { label: 'Raporty', icon: '📈', color: 'zielony' }
} as const;

export const RC_EMPTY_STATES = {
  apiaries: 'Nie masz jeszcze żadnych pasiek. Dodaj pierwszą pasiekę, żeby rozpocząć pracę.',
  hives: 'Nie masz jeszcze żadnych uli. Dodaj pierwszy ul i przypisz go do pasieki.',
  inventory: 'Magazyn jest pusty. Dodaj pierwszą pozycję, zanim znowu zaskoczy Cię brak ramek.',
  honey: 'Brak miodobrań. Dodaj pierwsze miodobranie, gdy pojawi się partia miodu.',
  health: 'Brak danych zdrowotnych. Dodaj pierwszy pomiar warrozy lub leczenie.',
  season: 'Brak planu sezonu. Utwórz plan, żeby aplikacja miała co kontrolować.'
} as const;

export const RC_POLISH_TERMS = {
  dashboard: 'Panel',
  backup: 'Kopia zapasowa',
  sync: 'Synchronizacja',
  cloudReady: 'Gotowe pod chmurę',
  aiReady: 'Gotowe pod AI',
  auditLog: 'Dziennik zmian',
  permissions: 'Uprawnienia',
  sharing: 'Współdzielenie',
  skeletonLoading: 'Ładowanie szkieletowe'
} as const;

export function getModuleTheme(module: keyof typeof MODULE_THEME) {
  return MODULE_THEME[module];
}

export function getEmptyState(key: keyof typeof RC_EMPTY_STATES): string {
  return RC_EMPTY_STATES[key];
}
