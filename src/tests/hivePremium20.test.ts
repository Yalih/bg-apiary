import { describe, expect, it } from 'vitest';
import { bgApiaryStrengthLabel } from '../logic/bgApiaryPremium20';

describe('Hive premium 2.0', () => {
  it('keeps short hive strength labels', () => {
    expect(bgApiaryStrengthLabel(10)).toBe('Bardzo silna rodzina');
    expect(bgApiaryStrengthLabel(6)).toBe('Średnia rodzina');
  });
});
