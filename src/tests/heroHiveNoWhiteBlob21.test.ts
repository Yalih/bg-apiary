import { describe, expect, it } from 'vitest';
import { hiveDetailsIconPolishRules } from '../logic/hiveDetailsIconPolish21';
import { getHeroHive } from '../logic/assetManager21';

describe('Hero hive no white blob 2.1', () => {
  it('uses v2 hero SVG and removes giant blob by CSS contract', () => {
    expect(getHeroHive({ strength: 7 })).toContain('/assets/bgapiary21v2/hive/hero/');
    expect(getHeroHive({ strength: 7 })).toMatch(/\.svg$/);
    expect(hiveDetailsIconPolishRules.heroWhiteBlobRemoved).toBe(true);
    expect(hiveDetailsIconPolishRules.heroHiveScalePercent).toBeGreaterThanOrEqual(15);
  });
});
