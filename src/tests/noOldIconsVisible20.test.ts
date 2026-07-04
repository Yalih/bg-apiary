import { describe, expect, it } from 'vitest';
import { BG_APIARY_REFERENCE_HIVES, BG_APIARY_REFERENCE_QUEENS } from '../logic/bgApiaryReferenceAssets';

describe('No old visible icons Visual Polish 2.0', () => {
  it('uses deployed reference assets instead of old visible placeholders', () => {
    Object.values(BG_APIARY_REFERENCE_HIVES).forEach(path => expect(path).toContain('bgapiary-reference'));
    Object.values(BG_APIARY_REFERENCE_QUEENS).forEach(path => expect(path).toContain('bgapiary-reference'));
  });
});
