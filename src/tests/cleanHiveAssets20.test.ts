import { describe, expect, it } from 'vitest';
import { CLEAN_HIVE_ASSETS, getCleanHiveAssetByState, getCleanHiveAssetByStrength } from '../logic/bgApiaryCleanAssets';

describe('clean hive assets 2.0', () => {
  it('maps hives to clean individual files and sizes', () => {
    expect(getCleanHiveAssetByStrength(10)).toBe('bardzoSilna');
    expect(getCleanHiveAssetByStrength(6)).toBe('srednia');
    expect(getCleanHiveAssetByState({ strength: 8, queenPresent: false })).toBe('bezMatki');
    expect(getCleanHiveAssetByState({ strength: 8, treatment: true })).toBe('leczenie');
    expect(getCleanHiveAssetByState({ strength: 8, alarm: true })).toBe('alarm');
    expect(CLEAN_HIVE_ASSETS.bardzoSilna.card).toContain('/assets/bgapiary-clean/hives/card/');
    expect(CLEAN_HIVE_ASSETS.bardzoSilna.hero).toContain('/assets/bgapiary-clean/hives/hero/');
  });
});
