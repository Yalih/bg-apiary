import { describe, expect, it } from 'vitest';
import { getMiniHive } from '../logic/assetManager21';

describe('BgApiary 2.1 mobile assets', () => {
  it('has all mini sizes', () => {
    expect(getMiniHive({ strength: 7 }, 32)).toContain('/mini/32/');
    expect(getMiniHive({ strength: 7 }, 48)).toContain('/mini/48/');
    expect(getMiniHive({ strength: 7 }, 64)).toContain('/mini/64/');
    expect(getMiniHive({ strength: 7 }, 96)).toContain('/mini/96/');
  });
});
