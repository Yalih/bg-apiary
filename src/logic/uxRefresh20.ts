export const UX_REFRESH_VERSION = '2.0 UX Refresh';

export const UX_REFRESH_THEME = {
  palette: ['grafit', 'biel', 'zieleń', 'żółty ostrzegawczy', 'czerwony alarmowy'],
  tone: 'spokojny, nowoczesny, czytelny',
  targetUser: 'około 40 lat',
  touchTargetPx: 44
} as const;

export const UX_EMPTY_ACTIONS = {
  apiaries: 'Dodaj pierwszą pasiekę',
  hives: 'Dodaj pierwszy ul',
  tasks: 'Dodaj pierwsze zadanie',
  backup: 'Importuj kopię zapasową',
  honey: 'Dodaj pierwsze miodobranie',
  health: 'Dodaj pierwszy pomiar zdrowia',
  inventory: 'Dodaj pierwszą pozycję magazynu'
} as const;

export const UX_DASHBOARD_LIMITS = {
  heroStats: 4,
  primarySections: 4,
  collapsedListItems: 3,
  expandedListItems: 6
} as const;

export const UX_FIELD_MODE = {
  maxVisibleInfoInFieldMode: 5,
  largeButtons: true,
  oneHandFriendly: true,
  reducedText: true
} as const;

export function getEmptyAction(key: keyof typeof UX_EMPTY_ACTIONS): string {
  return UX_EMPTY_ACTIONS[key];
}

export function limitDashboardItems<T>(items: T[], expanded = false): T[] {
  return items.slice(0, expanded ? UX_DASHBOARD_LIMITS.expandedListItems : UX_DASHBOARD_LIMITS.collapsedListItems);
}

export function shouldShowAdvancedFields(visibleFieldsCount: number): boolean {
  return visibleFieldsCount > 5;
}

export function isModernTouchTarget(px: number): boolean {
  return px >= UX_REFRESH_THEME.touchTargetPx;
}

export function simplifyRecommendation(text: string): string {
  return text.length <= 120 ? text : `${text.slice(0, 117).trim()}...`;
}
