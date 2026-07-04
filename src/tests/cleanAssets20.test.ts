import { describe, expect, it } from 'vitest';
import { HIVE_ASSET_FILES } from '../logic/bgApiaryAssets';

describe('Clean assets 2.0', () => {
  it('contains single files, not full reference sheets', () => {
    Object.values(HIVE_ASSET_FILES).forEach(file => {
      expect(file.endsWith('.png')).toBe(true);
      expect(file).not.toContain('reference');
      expect(file).not.toContain('sheet');
    });
  });
});
