import { describe, expect, it } from 'vitest';
import { getSeasonFromDate, getSeasonHive } from '../logic/assetManager21';

describe('BgApiary 2.1 seasonal assets', () => {
  it('selects seasonal assets by date only', () => {
    expect(getSeasonFromDate('2026-04-01')).toBe('spring');
    expect(getSeasonFromDate('2026-07-01')).toBe('summer');
    expect(getSeasonFromDate('2026-10-01')).toBe('autumn');
    expect(getSeasonFromDate('2026-01-01')).toBe('winter');
    expect(getSeasonHive({ strength: 9, date: '2026-07-01' })).toContain('/seasonal/summer/');
  });
});
