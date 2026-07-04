import { describe, expect, it } from 'vitest';
import { getHeroHive } from '../logic/bgApiaryAssets';

describe('Hero assets 2.0', () => {
  it('uses hero directory for hive details', () => {
    expect(getHeroHive({ strength: 6 })).toContain('/assets/bgapiary/hive/hero/');
  });
});
