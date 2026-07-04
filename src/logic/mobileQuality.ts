export const MOBILE_LAYOUT_TOKENS = [
  'env(safe-area-inset-bottom)',
  '--tap: 52px',
  '@media (max-width: 430px)',
  '@media (max-width: 360px)',
  '.empty-card::before',
  '.ux-polish-note',
  '.perf-badge'
] as const;

export function hasMobileQualityToken(token: string): boolean {
  return MOBILE_LAYOUT_TOKENS.includes(token as typeof MOBILE_LAYOUT_TOKENS[number]);
}
