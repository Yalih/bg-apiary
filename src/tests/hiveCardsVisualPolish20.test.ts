import { describe, expect, it } from 'vitest';
import { BG_APIARY_REFERENCE_HIVES } from '../logic/bgApiaryReferenceAssets';

describe('Hive cards Visual Polish 2.0', () => {
  it('uses reference hive graphics for cards', () => {
    expect(BG_APIARY_REFERENCE_HIVES.bardzoSilna).toContain('/assets/bgapiary-reference/hives/');
    expect(BG_APIARY_REFERENCE_HIVES.slaba).toContain('/assets/bgapiary-reference/hives/');
  });
});
