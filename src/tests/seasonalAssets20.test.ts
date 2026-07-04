import { describe, expect, it } from 'vitest';
import { getSeasonFromDate, getSeasonHive } from '../logic/bgApiaryAssets';

describe('Seasonal assets 2.0', () => {
  it('selects seasonal hive assets by date', () => {
    expect(getSeasonFromDate('2026-04-10')).toBe('spring');
    expect(getSeasonFromDate('2026-07-10')).toBe('summer');
    expect(getSeasonFromDate('2026-10-10')).toBe('autumn');
    expect(getSeasonFromDate('2026-01-10')).toBe('winter');
    expect(getSeasonHive({ strength: 8, date: '2026-07-10' })).toContain('/seasonal/summer/');
  });
});
