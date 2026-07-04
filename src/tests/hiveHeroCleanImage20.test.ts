import { describe, expect, it } from 'vitest';
import { CLEAN_HIVE_ASSETS } from '../logic/bgApiaryCleanAssets';

describe('hive hero clean image 2.0', () => {
  it('has hero-sized clean images for hive details', () => {
    expect(CLEAN_HIVE_ASSETS.silna.hero).toContain('/hives/hero/');
    expect(CLEAN_HIVE_ASSETS.hero.hero).toContain('/hives/hero/');
  });
});
