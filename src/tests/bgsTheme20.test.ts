import { describe, expect, it } from 'vitest';
import { BGS_COLORS, BGS_STYLE_CLASSES, BGS_THEME_VERSION } from '../logic/bgsTheme20';

describe('BGS Theme 2.0', () => {
  it('defines the BGS premium palette', () => {
    expect(BGS_THEME_VERSION).toBe('2.0 BGS Theme');
    expect(BGS_COLORS.bottleGreen).toBe('#103B28');
    expect(BGS_COLORS.green).toBe('#2F6B52');
    expect(BGS_COLORS.olive).toBe('#A7B38A');
    expect(BGS_COLORS.honeyGold).toBe('#D4A017');
    expect(BGS_COLORS.cream).toBe('#F2F4EC');
  });

  it('defines required BGS style classes', () => {
    expect(BGS_STYLE_CLASSES).toContain('bgs-shell');
    expect(BGS_STYLE_CLASSES).toContain('bgs-card');
    expect(BGS_STYLE_CLASSES).toContain('bgs-hive-card');
    expect(BGS_STYLE_CLASSES).toContain('bgs-bottom-nav');
    expect(BGS_STYLE_CLASSES).toContain('bgs-floating-action');
  });
});
