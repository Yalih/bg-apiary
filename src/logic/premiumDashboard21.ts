export const PREMIUM_DASHBOARD_VERSION = '2.1-premiumdashboard';

export const premiumDashboardSections = [
  'Hero',
  'Pogoda',
  'Pożytek',
  'Rekomendacja dnia',
  'Moje ule',
  'Najbliższe prace',
  'Alerty',
  'Asystent'
] as const;

export const premiumDashboardLimits = {
  visibleHives: 2,
  urgentTasks: 2,
  alerts: 2,
  searchResults: 4
} as const;

export const premiumDashboardPrinciples = {
  maximumInformation: true,
  minimumText: true,
  largerIllustrations: true,
  largerCards: true,
  clearerHierarchy: true
} as const;
