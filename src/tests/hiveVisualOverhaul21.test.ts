import { describe, expect, it } from 'vitest';
import { ASSET_MANAGER_VERSION, getHeroHive, getHiveAsset, getMiniHive, getQueenAsset, getQueenDot, getOverlay } from '../logic/assetManager21';

describe('BgApiary 2.1 Hive Visual Overhaul', () => {
  it('uses clean authored SVG assets instead of old reference sheets', () => {
    expect(ASSET_MANAGER_VERSION).toBe('2.1-hivevisualoverhaul');
    const paths = [
      getHeroHive({ strength: 8 }),
      getHiveAsset({ strength: 8, size: 'card' }),
      getMiniHive({ strength: 8 }, 64),
      getQueenAsset(),
      getQueenDot(2029).asset,
      getOverlay({ strength: 4 })
    ];
    paths.forEach(path => {
      expect(path).toContain('/assets/bgapiary21v2/');
      expect(path).toMatch(/\.svg$/);
      expect(path).not.toContain('reference');
      expect(path).not.toContain('sheet');
      expect(path).not.toContain('preview');
    });
  });
});
