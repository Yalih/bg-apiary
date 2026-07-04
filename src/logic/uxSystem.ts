export const ICONS = {
  start: '🏠',
  work: '✅',
  apiaries: '🐝',
  assistant: '🧠',
  more: '⋯',
  queens: '👑',
  reports: '📊',
  backup: '💾',
  inspection: '🔍',
  feeding: '🍯',
  note: '📝',
  photo: '📷',
  map: '🗺️',
  alert: '⚠️',
  queen: '👑',
  task: '✅'
} as const;

export const SEMANTIC_COLORS = {
  ok: 'zielony',
  observation: 'żółty',
  warning: 'pomarańczowy',
  urgent: 'czerwony',
  info: 'niebieski',
  brand: 'miód/brąz',
  action: 'ciemny',
  muted: 'szary'
} as const;

export const EMPTY_STATES = {
  tasksToday: {
    icon: ICONS.task,
    title: 'Brak zadań na dziś',
    description: 'Pszczoły wyjątkowo niczego nie żądają. Podejrzane, ale miłe.',
    action: 'Dodaj zadanie'
  },
  hives: {
    icon: ICONS.apiaries,
    title: 'Brak uli',
    description: 'Dodaj pierwszy ul, bo sama pasieka bez uli to tylko ambitna działka.',
    action: 'Dodaj ul'
  },
  reports: {
    icon: ICONS.reports,
    title: 'Brak danych do raportu',
    description: 'Dodaj przeglądy, karmienia albo zadania, a raport przestanie patrzeć w pustkę.',
    action: 'Dodaj dane'
  },
  queens: {
    icon: ICONS.queens,
    title: 'Brak matek w katalogu',
    description: 'Dodaj ul z matką albo wymianę matki, żeby katalog miał co pokazać.',
    action: 'Dodaj ul'
  }
} as const;

export function getEmptyState(key: keyof typeof EMPTY_STATES) {
  return EMPTY_STATES[key];
}
