import { describe, expect, it } from 'vitest';
import { getQueenDotByYear } from '../logic/bgApiaryCleanAssets';

describe('queen dot professional 2.0', () => {
  it('maps year to opalite color for 2021-2030', () => {
    const colors = [2021,2022,2023,2024,2025,2026,2027,2028,2029,2030].map(year => getQueenDotByYear(year).color);
    expect(colors).toEqual(['biała','żółta','czerwona','zielona','niebieska','biała','żółta','czerwona','zielona','niebieska']);
  });
});
