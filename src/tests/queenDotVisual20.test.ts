import { describe, expect, it } from 'vitest';
import { getQueenMarkingByYear } from '../logic/queenMarking20';

describe('Queen dot Visual Polish 2.0', () => {
  it('maps 2021-2030 to correct marking colors', () => {
    const colors = [2021,2022,2023,2024,2025,2026,2027,2028,2029,2030].map(year => getQueenMarkingByYear(year).color);
    expect(colors).toEqual(['biała','żółta','czerwona','zielona','niebieska','biała','żółta','czerwona','zielona','niebieska']);
  });
});
