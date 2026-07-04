import { describe, expect, it } from 'vitest';
import { BG_APIARY_REFERENCE_HIVES, BG_APIARY_REFERENCE_QUEENS } from '../logic/bgApiaryReferenceAssets';

describe('reference assets usage 2.0', () => {
  it('uses public bgapiary-reference paths that are deployable', () => {
    Object.values(BG_APIARY_REFERENCE_HIVES).forEach(path => expect(path).toContain('/assets/bgapiary-reference/'));
    Object.values(BG_APIARY_REFERENCE_QUEENS).forEach(path => expect(path).toContain('/assets/bgapiary-reference/'));
  });
});
