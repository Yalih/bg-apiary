import { describe, expect, it } from 'vitest';
import { BG_APIARY_COLORS } from '../logic/bgApiaryPremium20';

describe('Icon visibility 2.0', () => {
  it('uses green icons and gold accents', () => {
    expect(BG_APIARY_COLORS.deepGreen).toBe('#0F3D2E');
    expect(BG_APIARY_COLORS.honeyGold).toBe('#A57C2E');
  });
});
