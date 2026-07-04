import { describe, expect, it } from 'vitest';
import { getHiveAsset, getQueenAsset } from '../logic/assetManager21';

describe('BgApiary 2.1 no sprite sheets', () => {
  it('does not expose reference sheets through AssetManager', () => {
    [getHiveAsset({ strength: 8 }), getQueenAsset()].forEach(path => {
      expect(path).toContain('/assets/bgapiary21/');
      expect(path).not.toContain('reference');
      expect(path).not.toContain('preview');
      expect(path).not.toContain('sheet');
    });
  });
});
