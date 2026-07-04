import { describe, expect, it } from 'vitest';
import { PREMIUM_POLISH_TABS, PREMIUM_POLISH_TILES } from '../logic/premiumPolish20';

describe('Premium hive details 2.0', () => {
  it('defines tabs and information tiles for hive details', () => {
    expect(PREMIUM_POLISH_TABS).toEqual(['Przegląd', 'Notatki', 'Historia', 'Zdjęcia']);
    expect(PREMIUM_POLISH_TILES).toHaveLength(8);
  });
});
