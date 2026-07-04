import { describe, expect, it } from 'vitest';
import { premiumSectionLimit } from '../logic/premiumPolish20';

describe('Premium planner 2.0', () => {
  it('limits planner previews to avoid endless lists', () => {
    expect(premiumSectionLimit(false)).toBe(3);
    expect(premiumSectionLimit(true)).toBe(6);
  });
});
