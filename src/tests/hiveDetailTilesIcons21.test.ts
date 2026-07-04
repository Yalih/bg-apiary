import { describe, expect, it } from 'vitest';
import { hiveDetailsIconPolishRules, hiveDetailsPolishedTiles } from '../logic/hiveDetailsIconPolish21';

describe('Hive detail tile icons polish 2.1', () => {
  it('keeps icons visible and consistent', () => {
    expect(hiveDetailsIconPolishRules.tileIconColor).toBe('#0F3D2E');
    expect(hiveDetailsIconPolishRules.tileIconBackground).toBe('#F7F2E8');
    expect(hiveDetailsIconPolishRules.tileIconSizePx).toBeGreaterThanOrEqual(28);
    expect(hiveDetailsPolishedTiles.length).toBe(8);
  });
});
