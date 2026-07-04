import { describe, expect, it } from 'vitest';
import { getQueenDot } from '../logic/bgApiaryAssets';

describe('Queen dot pipeline 2.0', () => {
  it('returns dynamic opalite asset by queen year', () => {
    expect(getQueenDot(2026).color).toBe('biała');
    expect(getQueenDot(2027).asset).toContain('/queen/dots/yellow.png');
    expect(getQueenDot(2028).asset).toContain('/queen/dots/red.png');
    expect(getQueenDot(2029).asset).toContain('/queen/dots/green.png');
    expect(getQueenDot(2030).asset).toContain('/queen/dots/blue.png');
  });
});
