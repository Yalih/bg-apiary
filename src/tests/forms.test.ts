import { describe, expect, it } from 'vitest';
import { getQueenYearFromDate, validateApiaryForm, validateHiveForm } from '../logic/forms';

describe('forms', () => {
  it('extracts queen year from introduced date', () => {
    expect(getQueenYearFromDate('2026-06-02')).toBe(2026);
  });

  it('validates apiary name', () => {
    expect(validateApiaryForm({ name: '', location: '', description: '', imageEmoji: '🐝' })).toContain('Nazwa pasieki jest wymagana.');
  });

  it('validates hive form and accepts matching queen line', () => {
    const errors = validateHiveForm({
      apiaryId: 'apiary-1',
      name: 'Ul testowy',
      type: 'Warszawski Poszerzany',
      frameCount: 6,
      strength: 5,
      mood: 'normalna',
      foodLevel: 'średni',
      lastInspectionAt: '2026-07-02',
      queenIntroducedAt: '2026-06-02',
      queenBreed: 'Krainka',
      queenLine: 'Sklenar G10',
      notes: ''
    });

    expect(errors).toEqual([]);
  });

  it('rejects queen line that does not match breed', () => {
    const errors = validateHiveForm({
      apiaryId: 'apiary-1',
      name: 'Ul testowy',
      type: 'Warszawski Poszerzany',
      frameCount: 6,
      strength: 5,
      mood: 'normalna',
      foodLevel: 'średni',
      lastInspectionAt: '2026-07-02',
      queenIntroducedAt: '2026-06-02',
      queenBreed: 'Buckfast',
      queenLine: 'Sklenar G10',
      notes: ''
    });

    expect(errors).toContain('Wybrana linia nie pasuje do rasy matki.');
  });
});
