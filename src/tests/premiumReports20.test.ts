import { describe, expect, it } from 'vitest';
import { BG_APIARY_COLORS } from '../logic/bgApiaryPremium20';

describe('Premium reports 2.0', () => {
  it('uses premium palette for report cards', () => {
    expect(BG_APIARY_COLORS.deepGreen).toBe('#0F3D2E');
    expect(BG_APIARY_COLORS.honeyGold).toBe('#A57C2E');
  });
});
