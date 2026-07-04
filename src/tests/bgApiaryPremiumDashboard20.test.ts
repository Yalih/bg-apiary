import { describe, expect, it } from 'vitest';
import { BG_APIARY_NAV, BG_APIARY_QUICK_ACCESS } from '../logic/bgApiaryPremium20';

describe('BG Apiary Premium dashboard 2.0', () => {
  it('uses reference navigation and quick access cards', () => {
    expect(BG_APIARY_NAV).toEqual(['Pulpit', 'Ule', '+', 'Plan', 'Więcej']);
    expect(BG_APIARY_QUICK_ACCESS.map(item => item.label)).toEqual(['Przeglądy', 'Rodziny', 'Plan prac', 'Notatki', 'Raporty', 'Pogoda']);
  });
});
