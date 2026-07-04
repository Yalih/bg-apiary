import { describe, expect, it } from 'vitest';
import { BG_APIARY_CLASSES, BG_APIARY_COLORS, BG_APIARY_PREMIUM_VERSION } from '../logic/bgApiaryPremium20';

describe('BG Apiary Premium theme 2.0', () => {
  it('defines the premium reference palette', () => {
    expect(BG_APIARY_PREMIUM_VERSION).toBe('2.0 BG Apiary Premium');
    expect(BG_APIARY_COLORS.deepGreen).toBe('#0F3D2E');
    expect(BG_APIARY_COLORS.forestGreen).toBe('#1E5B43');
    expect(BG_APIARY_COLORS.honeyGold).toBe('#A57C2E');
    expect(BG_APIARY_COLORS.warmWhite).toBe('#F5F7F5');
    expect(BG_APIARY_COLORS.sand).toBe('#EAE6DA');
  });

  it('defines required premium classes', () => {
    expect(BG_APIARY_CLASSES).toContain('bgapiary-shell');
    expect(BG_APIARY_CLASSES).toContain('bgapiary-hero');
    expect(BG_APIARY_CLASSES).toContain('bgapiary-hive-card');
    expect(BG_APIARY_CLASSES).toContain('bgapiary-bottom-nav');
  });
});
