import { describe, expect, it } from 'vitest';
import { getReferenceHiveByState } from '../logic/bgApiaryReferenceAssets';

describe('reference hive cards 2.0', () => {
  it('selects reference hive assets by real state', () => {
    expect(getReferenceHiveByState({ strength: 10 })).toBe('bardzoSilna');
    expect(getReferenceHiveByState({ strength: 7 })).toBe('silna');
    expect(getReferenceHiveByState({ strength: 4 })).toBe('slaba');
    expect(getReferenceHiveByState({ strength: 8, queenPresent: false })).toBe('bezMatki');
    expect(getReferenceHiveByState({ strength: 8, treatment: true })).toBe('leczenie');
    expect(getReferenceHiveByState({ strength: 8, alarm: true })).toBe('alarmZdrowotny');
  });
});
