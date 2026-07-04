import { describe, expect, it } from 'vitest';
import { BGS_VISUAL_ICONS } from '../logic/bgsVisual20';

describe('Icon consistency 2.0', () => {
  it('removes temporary text symbols from icon system', () => {
    Object.values(BGS_VISUAL_ICONS).forEach(path => {
      expect(path).not.toContain('▰');
      expect(path).not.toContain('▣');
      expect(path).not.toContain('♧');
    });
  });
});
