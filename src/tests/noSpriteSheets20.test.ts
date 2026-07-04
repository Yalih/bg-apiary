import { describe, expect, it } from 'vitest';
import { getHiveAsset, getQueenBase } from '../logic/bgApiaryAssets';

describe('No sprite sheets 2.0', () => {
  it('does not return preview or reference board paths', () => {
    const paths = [
      getHiveAsset({ strength: 8 }),
      getQueenBase()
    ];
    paths.forEach(path => {
      expect(path).not.toContain('preview');
      expect(path).not.toContain('reference.jpeg');
      expect(path).not.toContain('library-reference');
    });
  });
});
