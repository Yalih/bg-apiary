import { describe, expect, it } from 'vitest';
import { bgApiaryHiveTone, bgApiaryStrengthPercent } from '../logic/bgApiaryPremium20';

describe('Premium hive cards 2.0', () => {
  it('keeps visual status clear', () => {
    expect(bgApiaryStrengthPercent(8)).toBe(80);
    expect(bgApiaryHiveTone(8)).toBe('ok');
    expect(bgApiaryHiveTone(4)).toBe('warning');
    expect(bgApiaryHiveTone(1)).toBe('alert');
  });
});
