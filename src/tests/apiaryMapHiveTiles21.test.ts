import { describe, expect, it } from 'vitest';
import { getShortInspectionLabel21 } from '../logic/apiaryMapPremium21';

describe('apiary map hive tiles 2.1', () => {
  it('uses short inspection label for tile', () => {
    expect(getShortInspectionLabel21({ id: 'h1' } as any)).toBe('Przegląd: zaplanuj');
    expect(getShortInspectionLabel21({ id: 'h1', lastInspectionDate: '2026-07-03' } as any)).toBe('Przegląd: 2026-07-03');
  });
});
