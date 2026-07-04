import { describe, expect, it } from 'vitest';
import { BG_APIARY_ASSET_PIPELINE_VERSION, getHiveAsset } from '../logic/bgApiaryAssets';

describe('Premium asset pipeline 2.0', () => {
  it('uses the premium asset pipeline paths', () => {
    expect(BG_APIARY_ASSET_PIPELINE_VERSION).toBe('2.0-premium-asset-pipeline');
    expect(getHiveAsset({ strength: 8, size: 'card' })).toContain('/assets/bgapiary/hive/card/');
  });
});
