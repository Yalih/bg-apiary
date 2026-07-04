import { describe, expect, it } from 'vitest';
import { MOBILE_LAYOUT_TOKENS, hasMobileQualityToken } from '../logic/mobileQuality';

describe('mobile layout 1.5', () => {
  it('defines safe area and tap-size quality tokens', () => {
    expect(hasMobileQualityToken('env(safe-area-inset-bottom)')).toBe(true);
    expect(hasMobileQualityToken('--tap: 52px')).toBe(true);
    expect(hasMobileQualityToken('@media (max-width: 430px)')).toBe(true);
    expect(hasMobileQualityToken('@media (max-width: 360px)')).toBe(true);
  });

  it('defines final polish quality tokens', () => {
    expect(MOBILE_LAYOUT_TOKENS).toContain('.empty-card::before');
    expect(MOBILE_LAYOUT_TOKENS).toContain('.ux-polish-note');
    expect(MOBILE_LAYOUT_TOKENS).toContain('.perf-badge');
  });
});
