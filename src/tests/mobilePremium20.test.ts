import { describe, expect, it } from 'vitest';
import { BGS_VISUAL_COLORS } from '../logic/bgsVisual20';

describe('Mobile premium 2.0', () => {
  it('keeps mobile palette readable', () => {
    expect(BGS_VISUAL_COLORS.white).toBe('#FFFFFF');
    expect(BGS_VISUAL_COLORS.light).toBe('#F5F7F5');
  });
});
