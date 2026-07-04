import { describe, expect, it } from 'vitest';
import { BGS_COLORS } from '../logic/bgsTheme20';

describe('BGS mobile 2.0', () => {
  it('keeps calm colors for mobile premium UI', () => {
    expect(BGS_COLORS.danger).toBe('#B42318');
    expect(BGS_COLORS.white).toBe('#FFFFFF');
    expect(BGS_COLORS.cream).toBe('#F2F4EC');
  });
});
