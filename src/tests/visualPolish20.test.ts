import { describe, expect, it } from 'vitest';
import { VISUAL_POLISH_COLORS, VISUAL_POLISH_RADIUS, VISUAL_POLISH_SHADOWS } from '../logic/visualPolish20';

describe('Visual Polish 2.0', () => {
  it('defines a single visual token system', () => {
    expect(VISUAL_POLISH_COLORS.deepGreen).toBe('#0F3D2E');
    expect(VISUAL_POLISH_COLORS.gold).toBe('#A57C2E');
    expect(VISUAL_POLISH_SHADOWS.md).toContain('rgba(15, 61, 46');
    expect(VISUAL_POLISH_RADIUS.xl).toBe(34);
  });
});
