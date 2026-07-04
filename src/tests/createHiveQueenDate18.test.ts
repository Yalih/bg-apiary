import { describe, expect, it } from 'vitest';
import { getQueenYearFromDate, validateHiveForm } from '../logic/forms';

describe('create hive queen introduced date 1.8', () => {
  it('uses queen introduced date to calculate queen year', () => {
    expect(getQueenYearFromDate('2026-07-01')).toBe(2026);
  });

  it('accepts queen introduced date in hive form validation', () => {
    const errors = validateHiveForm({
      apiaryId: 'a1',
      name: 'Ul 1',
      type: 'Warszawski Poszerzany',
      frameCount: 6,
      strength: 5,
      mood: 'normalna',
      foodLevel: 'średni',
      lastInspectionAt: '2026-07-01',
      queenIntroducedAt: '2026-06-01',
      queenBreed: 'Krainka',
      queenLine: 'Sklenar G10',
      notes: ''
    });
    expect(errors).toEqual([]);
  });
});
