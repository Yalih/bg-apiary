import { describe, expect, it } from 'vitest';
import { CLEAN_HIVE_ASSETS } from '../logic/bgApiaryCleanAssets';

describe('hive card clean image 2.0', () => {
  it('has card-sized clean images for hive cards', () => {
    expect(CLEAN_HIVE_ASSETS.srednia.card).toContain('/hives/card/');
    expect(CLEAN_HIVE_ASSETS.slaba.card).toContain('/hives/card/');
  });
});
