import { describe, expect, it } from 'vitest';
import { getQueenDot } from '../logic/assetManager21';

describe('BgApiary 2.1 queen dot', () => {
  it('maps year to dynamic opalite asset', () => {
    expect(getQueenDot(2026).asset).toContain('/queen/dots/white.png');
    expect(getQueenDot(2027).asset).toContain('/queen/dots/yellow.png');
    expect(getQueenDot(2028).asset).toContain('/queen/dots/red.png');
    expect(getQueenDot(2029).asset).toContain('/queen/dots/green.png');
    expect(getQueenDot(2030).asset).toContain('/queen/dots/blue.png');
  });
});
