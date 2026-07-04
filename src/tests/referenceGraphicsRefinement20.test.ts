import { describe, expect, it } from 'vitest';
import { BG_APIARY_REFERENCE_HIVES, BG_APIARY_REFERENCE_QUEENS } from '../logic/bgApiaryReferenceAssets';

describe('reference graphics refinement 2.0', () => {
  it('uses reference board assets for hives and queens', () => {
    expect(BG_APIARY_REFERENCE_HIVES.bardzoSilna).toContain('bgapiary-reference/hives');
    expect(BG_APIARY_REFERENCE_HIVES.alarmZdrowotny).toContain('alarm_zdrowotny');
    expect(BG_APIARY_REFERENCE_QUEENS.matkaObecna).toContain('bgapiary-reference/queens');
    expect(BG_APIARY_REFERENCE_QUEENS.matkaDoWymiany).toContain('matka_do_wymiany');
  });
});
