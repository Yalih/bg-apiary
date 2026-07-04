export const FINAL_PREMIUM_AUDIT_VERSION = '2.1-final-premium';

export const finalPremiumBreakpoints = [390, 430, 768, 1024] as const;

export const finalPremiumChecklist = {
  assets: true,
  icons: true,
  illustrations: true,
  screens: true,
  mobile: true,
  desktop: true,
  accessibility: true,
  contrast: true,
  spacing: true,
  shadows: true,
  radii: true,
  typography: true,
  assetManager: true,
  placeholders: true,
  spriteSheets: true,
  emoji: true,
  oldIcons: true,
  responsiveness: true
} as const;

export const finalPremiumResult = {
  status: 'gotowe-do-testów-użytkownika',
  productionReadiness: 'wysoka',
  requiresManualVisualReview: true,
  note: 'Audyt automatyczny nie zastępuje końcowego sprawdzenia wizualnego na realnym telefonie.'
} as const;
