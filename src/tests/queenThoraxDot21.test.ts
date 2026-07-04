import { describe, expect, it } from 'vitest';
import { getQueenAsset, getQueenDot } from '../logic/assetManager21';

describe('Queen thorax dot 2.1', () => {
  it('uses one queen base and dynamic dot assets by year', () => {
    expect(getQueenAsset()).toContain('/queen/base/queen_base.svg');
    expect(getQueenDot(2026).asset).toContain('/queen/dots/white.svg');
    expect(getQueenDot(2027).asset).toContain('/queen/dots/yellow.svg');
    expect(getQueenDot(2028).asset).toContain('/queen/dots/red.svg');
    expect(getQueenDot(2029).asset).toContain('/queen/dots/green.svg');
    expect(getQueenDot(2030).asset).toContain('/queen/dots/blue.svg');
  });
});
