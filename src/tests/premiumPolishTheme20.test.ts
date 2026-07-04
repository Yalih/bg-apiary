import { describe, expect, it } from 'vitest';
import { PREMIUM_POLISH_CLASSES, PREMIUM_POLISH_TILES, PREMIUM_POLISH_VERSION } from '../logic/premiumPolish20';

describe('Premium Polish theme 2.0', () => {
  it('defines premium polish version and core classes', () => {
    expect(PREMIUM_POLISH_VERSION).toBe('2.0 BG Apiary Premium Polish');
    expect(PREMIUM_POLISH_CLASSES).toContain('premium-hive-hero');
    expect(PREMIUM_POLISH_CLASSES).toContain('premium-floating-actions');
    expect(PREMIUM_POLISH_TILES).toContain('Matka');
    expect(PREMIUM_POLISH_TILES).toContain('Plan sezonu');
  });
});
