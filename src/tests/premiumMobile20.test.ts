import { describe, expect, it } from 'vitest';
import { PREMIUM_POLISH_ACCESSIBILITY } from '../logic/premiumPolish20';

describe('Premium mobile 2.0', () => {
  it('keeps mobile touch target minimum', () => {
    expect(PREMIUM_POLISH_ACCESSIBILITY.minTouchTargetPx).toBeGreaterThanOrEqual(44);
  });
});
