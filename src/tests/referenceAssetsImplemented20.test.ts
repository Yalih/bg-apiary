import { describe, expect, it } from 'vitest';
import { BG_APIARY_REFERENCE_HIVES, BG_APIARY_REFERENCE_QUEENS, BG_APIARY_REFERENCE_STATUS } from '../logic/bgApiaryReferenceAssets';

describe('reference assets implemented 2.0', () => {
  it('maps uploaded-board hive, queen and status assets', () => {
    expect(Object.keys(BG_APIARY_REFERENCE_HIVES).length).toBeGreaterThanOrEqual(17);
    expect(Object.keys(BG_APIARY_REFERENCE_QUEENS).length).toBe(12);
    expect(Object.keys(BG_APIARY_REFERENCE_STATUS).length).toBe(15);
    expect(BG_APIARY_REFERENCE_HIVES.bardzoSilna).toContain('/assets/bgapiary-reference/hives/');
    expect(BG_APIARY_REFERENCE_QUEENS.matkaObecna).toContain('/assets/bgapiary-reference/queens/');
  });
});
