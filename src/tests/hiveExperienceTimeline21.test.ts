import { describe, expect, it } from 'vitest';
import { getHiveExperienceVisibleHistory } from '../logic/premiumHiveExperience21';

describe('BgApiary 2.1 premium timeline', () => {
  it('keeps timeline compact by default', () => {
    expect(getHiveExperienceVisibleHistory(false)).toBe(6);
    expect(getHiveExperienceVisibleHistory(true)).toBeGreaterThan(6);
  });
});
