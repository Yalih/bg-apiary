import { describe, expect, it } from 'vitest';
import { ASSET_MANAGER_VERSION, getHiveAsset, getHeroHive, getMiniHive } from '../logic/assetManager21';

describe('BgApiary 2.1 Asset Pipeline', () => {
  it('uses AssetManager 2.1 paths', () => {
    expect(ASSET_MANAGER_VERSION).toBe('2.1-assetpipeline');
    expect(getHiveAsset({ strength: 8, size: 'card' })).toContain('/assets/bgapiary21/hive/card/');
    expect(getHeroHive({ strength: 8 })).toContain('/assets/bgapiary21/hive/hero/');
    expect(getMiniHive({ strength: 8 }, 96)).toContain('/assets/bgapiary21/hive/mini/96/');
  });
});
