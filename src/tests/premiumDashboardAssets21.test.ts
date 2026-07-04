import { describe, expect, it } from 'vitest';
import { getHiveAsset } from '../logic/assetManager21';

describe('BgApiary 2.1 Premium Dashboard assets', () => {
  it('uses card-sized single hive assets for dashboard cards', () => {
    expect(getHiveAsset({ strength: 8, size: 'card' })).toContain('/assets/bgapiary21/hive/card/');
    expect(getHiveAsset({ strength: 8, size: 'card' })).not.toContain('reference');
  });
});
