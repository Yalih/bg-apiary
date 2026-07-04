export const moduleIconAssets = {
  dashboard: '/brand/icons/dashboard.svg',
  hives: '/brand/icons/hives.svg',
  queens: '/brand/icons/queens.svg',
  inspections: '/brand/icons/inspections.svg',
  tasks: '/brand/icons/tasks.svg',
  calendar: '/brand/icons/calendar.svg',
  statistics: '/brand/icons/statistics.svg',
  weather: '/brand/icons/weather.svg',
  settings: '/brand/icons/settings.svg',
  notes: '/brand/icons/notes.svg',
  gps: '/brand/icons/gps.svg',
  alerts: '/brand/icons/alerts.svg'
} as const;

export const placeholderAssets = {
  hive: '/brand/placeholders/hive-placeholder.svg',
  queen: '/brand/placeholders/queen-placeholder.svg',
  apiary: '/brand/placeholders/apiary-placeholder.svg',
  empty: '/brand/placeholders/empty-state.svg',
  error: '/brand/placeholders/error-state.svg',
  success: '/brand/placeholders/success-state.svg'
} as const;

export type ModuleIconName = keyof typeof moduleIconAssets;
export type PlaceholderAssetName = keyof typeof placeholderAssets;
