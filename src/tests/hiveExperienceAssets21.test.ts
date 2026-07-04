import { describe, expect, it } from 'vitest';
import { getHeroHive, getOverlay, getQueenDot } from '../logic/assetManager21';

describe('BgApiary 2.1 hive visual assets', () => {
  it('uses hero, overlay and queen dot assets', () => {
    expect(getHeroHive({ strength: 8 })).toContain('/assets/bgapiary21/hive/hero/');
    expect(getOverlay({ strength: 8 })).toContain('/assets/bgapiary21/overlay/');
    expect(getQueenDot(2026).asset).toContain('/assets/bgapiary21/queen/dots/');
  });
});
