import { describe, expect, it } from 'vitest';
import { BG_APIARY_REFERENCE_QUEENS } from '../logic/bgApiaryReferenceAssets';
import { QUEEN_MARKING_LEGEND } from '../logic/queenMarking20';

describe('queen icon dot component 2.0', () => {
  it('has reference queen icons and complete marking legend', () => {
    expect(Object.keys(BG_APIARY_REFERENCE_QUEENS).length).toBe(12);
    expect(QUEEN_MARKING_LEGEND.map(item => item.color)).toEqual(['biała', 'żółta', 'czerwona', 'zielona', 'niebieska']);
  });
});
