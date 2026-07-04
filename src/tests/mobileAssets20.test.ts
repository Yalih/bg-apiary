import { describe, expect, it } from 'vitest';
import { getMiniHive } from '../logic/bgApiaryAssets';

describe('Mobile assets 2.0', () => {
  it('has mobile mini variants', () => {
    expect(getMiniHive({ strength: 8 }, 32)).toContain('/mini/32/');
    expect(getMiniHive({ strength: 8 }, 48)).toContain('/mini/48/');
    expect(getMiniHive({ strength: 8 }, 96)).toContain('/mini/96/');
  });
});
