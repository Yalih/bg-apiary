import { describe, expect, it } from 'vitest';
import { CLEAN_HIVE_ASSETS } from '../logic/bgApiaryCleanAssets';

describe('mobile clean assets 2.0', () => {
  it('has mini variants for compact mobile UI', () => {
    expect(CLEAN_HIVE_ASSETS.bardzoSilna.mini).toContain('/hives/mini/');
    expect(CLEAN_HIVE_ASSETS.nowyPakiet.mini).toContain('/hives/mini/');
  });
});
