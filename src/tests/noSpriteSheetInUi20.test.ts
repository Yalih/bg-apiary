import { describe, expect, it } from 'vitest';
import { CLEAN_HIVE_ASSETS, CLEAN_QUEEN_ASSETS, CLEAN_STATUS_OVERLAYS } from '../logic/bgApiaryCleanAssets';

describe('no sprite sheet in UI 2.0', () => {
  it('exposes clean asset paths only for UI mapping', () => {
    Object.values(CLEAN_HIVE_ASSETS).forEach(sizes => Object.values(sizes).forEach(path => {
      expect(path).toContain('/assets/bgapiary-clean/');
      expect(path).not.toContain('preview');
      expect(path).not.toContain('reference.jpeg');
    }));
    Object.values(CLEAN_QUEEN_ASSETS).forEach(path => expect(path).toContain('/assets/bgapiary-clean/'));
    Object.values(CLEAN_STATUS_OVERLAYS).forEach(path => expect(path).toContain('/assets/bgapiary-clean/'));
  });
});
