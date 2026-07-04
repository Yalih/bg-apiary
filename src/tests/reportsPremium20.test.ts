import { describe, expect, it } from 'vitest';
import { BGS_VISUAL_COLORS } from '../logic/bgsVisual20';

describe('Reports premium 2.0', () => {
  it('uses green and gold report accents', () => {
    expect(BGS_VISUAL_COLORS.deepGreen).toBe('#0F3D2E');
    expect(BGS_VISUAL_COLORS.honeyGold).toBe('#A57C2E');
  });
});
