import { describe, expect, it } from 'vitest';
import { VISUAL_POLISH_SECTIONS, visualPolishSectionLimit } from '../logic/visualPolish20';

describe('Dashboard Visual Polish 2.0', () => {
  it('keeps dashboard focused and not endless', () => {
    expect(VISUAL_POLISH_SECTIONS).toEqual(['Dzisiaj', 'Moje ule', 'Najbliższe prace', 'Alerty', 'Asystent']);
    expect(visualPolishSectionLimit(false)).toBe(3);
    expect(visualPolishSectionLimit(true)).toBe(6);
  });
});
