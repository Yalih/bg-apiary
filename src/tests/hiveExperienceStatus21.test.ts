import { describe, expect, it } from 'vitest';
import { getHiveExperienceStatus } from '../logic/premiumHiveExperience21';

describe('BgApiary 2.1 hive status labels', () => {
  it('maps strength to premium status labels', () => {
    expect(getHiveExperienceStatus(10)).toBe('bardzo-silna');
    expect(getHiveExperienceStatus(7)).toBe('silna');
    expect(getHiveExperienceStatus(5)).toBe('średnia');
    expect(getHiveExperienceStatus(3)).toBe('słaba');
    expect(getHiveExperienceStatus(1)).toBe('bardzo-słaba');
  });
});
