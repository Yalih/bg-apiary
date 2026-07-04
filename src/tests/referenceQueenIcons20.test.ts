import { describe, expect, it } from 'vitest';
import { getReferenceQueenByStatus } from '../logic/bgApiaryReferenceAssets';

describe('reference queen icons 2.0', () => {
  it('selects queen board assets by status', () => {
    expect(getReferenceQueenByStatus({ present: true })).toBe('matkaObecna');
    expect(getReferenceQueenByStatus({ young: true })).toBe('mlodaMatka');
    expect(getReferenceQueenByStatus({ old: true })).toBe('matkaStara');
    expect(getReferenceQueenByStatus({ present: false })).toBe('brakMatki');
    expect(getReferenceQueenByStatus({ replace: true })).toBe('matkaDoWymiany');
  });
});
