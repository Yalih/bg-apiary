import { describe, expect, it } from 'vitest';
import { getHiveIllustrationByStrength } from '../logic/bgApiaryAssets';

describe('hive cards illustrations 2.0', () => {
  it('maps hive strength to BG APIARY illustrations', () => {
    expect(getHiveIllustrationByStrength(10)).toBeDefined();
    expect(getHiveIllustrationByStrength(6)).toBeDefined();
    expect(getHiveIllustrationByStrength(2)).toBeDefined();
  });
});
