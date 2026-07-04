import { describe, expect, it } from 'vitest';
import { premiumColors, premiumRadii, premiumShadows, premiumSpacing, premiumTypography, PREMIUM_VISUAL_SYSTEM_VERSION } from '../logic/premiumVisualSystem21';

describe('BgApiary 2.1 Premium Visual System', () => {
  it('defines one visual token library', () => {
    expect(PREMIUM_VISUAL_SYSTEM_VERSION).toBe('2.1-visualsystem');
    expect(premiumColors.green900).toBe('#0F3D2E');
    expect(premiumColors.gold700).toBe('#A57C2E');
    expect(premiumRadii.lg).toBe('28px');
    expect(premiumShadows.md).toContain('rgba(15, 61, 46');
    expect(premiumSpacing.md).toBe('16px');
    expect(premiumTypography.family).toContain('Manrope');
  });
});
