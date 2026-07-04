import { describe, expect, it } from 'vitest';
import { PREMIUM_POLISH_ACCESSIBILITY } from '../logic/premiumPolish20';

describe('Premium accessibility 2.0', () => {
  it('defines accessibility constraints', () => {
    expect(PREMIUM_POLISH_ACCESSIBILITY.focusVisible).toBe(true);
    expect(PREMIUM_POLISH_ACCESSIBILITY.ariaForIcons).toBe(true);
    expect(PREMIUM_POLISH_ACCESSIBILITY.noHorizontalScroll).toBe(true);
  });
});
