import { describe, expect, it } from 'vitest';
import { hiveDetailsIconPolishRules, hiveDetailsQuickActions } from '../logic/hiveDetailsIconPolish21';

describe('Mobile hive details polish 2.1', () => {
  it('keeps quick actions readable and bottom safe', () => {
    expect(hiveDetailsIconPolishRules.quickActionMinWidthPx).toBeGreaterThanOrEqual(104);
    expect(hiveDetailsIconPolishRules.mobileSafeBottomPx).toBeGreaterThanOrEqual(120);
    expect(hiveDetailsQuickActions).toEqual(['Przegląd', 'Karmienie', 'Matka', 'Zdjęcie', 'Notatka']);
  });
});
