import { describe, expect, it } from 'vitest';
import { BG_APIARY_ICON_ALIASES } from '../logic/bgApiaryAssets';

describe('temporary symbols removed from asset layer 2.0', () => {
  it('uses svg files instead of visible placeholder symbols', () => {
    Object.values(BG_APIARY_ICON_ALIASES).forEach(path => {
      expect(path.endsWith('.svg')).toBe(true);
      expect(path).not.toContain('▰');
      expect(path).not.toContain('▣');
      expect(path).not.toContain('♧');
    });
  });
});
