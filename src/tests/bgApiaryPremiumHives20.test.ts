import { describe, expect, it } from 'vitest';
import { bgApiaryHiveTone, bgApiaryStrengthLabel, bgApiaryStrengthPercent } from '../logic/bgApiaryPremium20';

describe('BG Apiary Premium hive cards 2.0', () => {
  it('formats hive status like premium cards', () => {
    expect(bgApiaryStrengthPercent(10)).toBe(100);
    expect(bgApiaryStrengthLabel(10)).toBe('Bardzo silna rodzina');
    expect(bgApiaryStrengthLabel(7)).toBe('Średnia rodzina');
    expect(bgApiaryHiveTone(7)).toBe('ok');
    expect(bgApiaryHiveTone(4)).toBe('warning');
    expect(bgApiaryHiveTone(2)).toBe('alert');
  });
});
