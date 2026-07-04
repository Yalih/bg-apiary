import { describe, expect, it } from 'vitest';
import { HIVE_DETAILS_ICON_POLISH_VERSION, hiveDetailsIconPolishRules, hiveDetailsPolishedTiles } from '../logic/hiveDetailsIconPolish21';

describe('BgApiary 2.1 Hive Details Icon Polish', () => {
  it('defines icon polish rules for hive details', () => {
    expect(HIVE_DETAILS_ICON_POLISH_VERSION).toBe('2.1-hivedetails-iconpolish');
    expect(hiveDetailsIconPolishRules.heroWhiteBlobRemoved).toBe(true);
    expect(hiveDetailsIconPolishRules.heroHiveCentered).toBe(true);
    expect(hiveDetailsIconPolishRules.tileIconSizePx).toBe(32);
    expect(hiveDetailsPolishedTiles).toContain('Matka');
    expect(hiveDetailsPolishedTiles).toContain('Plan');
  });
});
