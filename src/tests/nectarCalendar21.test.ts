import { describe, expect, it } from 'vitest';
import { findCalendarNectar, getNectarPhase, POLAND_NECTAR_CALENDAR } from '../logic/nectarAccuracy21';

describe('nectar calendar 2.1', () => {
  it('contains local seasonal nectar calendar', () => {
    expect(POLAND_NECTAR_CALENDAR.map(item => item.name)).toContain('lipa');
    expect(POLAND_NECTAR_CALENDAR.map(item => item.name)).toContain('rzepak');
    const lipa = POLAND_NECTAR_CALENDAR.find(item => item.name === 'lipa')!;
    expect(getNectarPhase(lipa, new Date('2026-06-25'))).not.toBe('brak');
    expect(findCalendarNectar(new Date('2026-06-25'))).not.toBeNull();
  });
});
