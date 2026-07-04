import { describe, expect, it } from 'vitest';
import { BG_APIARY_ICON_ALIASES } from '../logic/bgApiaryAssets';

describe('icons actually used 2.0', () => {
  it('provides stable BG APIARY icon aliases for UI integration', () => {
    expect(Object.keys(BG_APIARY_ICON_ALIASES)).toEqual(expect.arrayContaining([
      'pulpit',
      'ule',
      'pogoda',
      'pozytek',
      'zdrowie',
      'magazyn',
      'raporty',
      'planSezonu',
      'notatki',
      'wiecej'
    ]));
  });
});
