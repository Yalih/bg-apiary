import { describe, expect, it } from 'vitest';
import { BGS_VISUAL_COLORS } from '../logic/bgsVisual20';

describe('Planner premium 2.0', () => {
  it('uses calm premium colors for planner', () => {
    expect(BGS_VISUAL_COLORS.accentGreen).toBe('#1E5B43');
  });
});
