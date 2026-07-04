import { describe, expect, it } from 'vitest';
import { BGS_VISUAL_COLORS, BGS_VISUAL_VERSION } from '../logic/bgsVisual20';

describe('BGS Visual Experience 2.0', () => {
  it('defines final visual palette', () => {
    expect(BGS_VISUAL_VERSION).toBe('2.0 BGS Visual Experience');
    expect(BGS_VISUAL_COLORS.deepGreen).toBe('#0F3D2E');
    expect(BGS_VISUAL_COLORS.honeyGold).toBe('#A57C2E');
    expect(BGS_VISUAL_COLORS.light).toBe('#F5F7F5');
  });
});
