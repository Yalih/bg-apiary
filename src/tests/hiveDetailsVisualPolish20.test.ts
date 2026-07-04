import { describe, expect, it } from 'vitest';
import { BG_APIARY_REFERENCE_HIVES, BG_APIARY_REFERENCE_QUEENS } from '../logic/bgApiaryReferenceAssets';

describe('Hive details Visual Polish 2.0', () => {
  it('has assets for hero hive and queen tile', () => {
    expect(BG_APIARY_REFERENCE_HIVES.hero).toContain('variant_hero_ul');
    expect(BG_APIARY_REFERENCE_QUEENS.matkaObecna).toContain('matka_obecna');
  });
});
