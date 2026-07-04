import { describe, expect, it } from 'vitest';
import { getHeroHive, getMiniHive, getQueenAsset, getQueenDot } from '../logic/assetManager21';

describe('BgApiary 2.1 Final Premium AssetManager', () => {
  it('uses bgapiary21 asset paths', () => {
    const paths = [
      getHeroHive({ strength: 8 }),
      getMiniHive({ strength: 8 }, 64),
      getQueenAsset(),
      getQueenDot(2026).asset
    ];
    paths.forEach(path => {
      expect(path).toMatch(/\/assets\/bgapiary21(v2)?\//);
      expect(path).not.toContain('reference');
      expect(path).not.toContain('preview');
    });
  });
});
