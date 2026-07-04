import { describe, expect, it } from 'vitest';
import { CLEAN_QUEEN_ASSETS, getCleanQueenAssetByStatus } from '../logic/bgApiaryCleanAssets';

describe('clean queen assets 2.0', () => {
  it('maps queen states to clean individual files', () => {
    expect(Object.keys(CLEAN_QUEEN_ASSETS).length).toBe(12);
    expect(getCleanQueenAssetByStatus({ present: false })).toBe('brakMatki');
    expect(getCleanQueenAssetByStatus({ young: true })).toBe('mlodaMatka');
    expect(getCleanQueenAssetByStatus({ replace: true })).toBe('matkaDoWymiany');
    expect(CLEAN_QUEEN_ASSETS.matkaObecna).toContain('/assets/bgapiary-clean/queens/');
  });
});
