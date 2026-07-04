import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { replaceQueen, validateQueenReplacementForm } from '../logic/queenReplacement';

describe('queen replacement 1.1', () => {
  it('moves old queen to history and sets new queen', () => {
    const hive = demoState.hives[0];
    const updated = replaceQueen(hive, {
      date: '2026-07-01',
      reason: 'wymiana planowa',
      breed: 'Buckfast',
      line: 'B54',
      year: 2026,
      introducedAt: '2026-07-01',
      origin: 'zakupiona',
      status: 'caged',
      marked: true,
      clippedWing: false,
      note: '',
      checkDate: '2026-07-04'
    });

    expect(updated.queen.breed).toBe('Buckfast');
    expect(updated.queenHistory).toHaveLength(1);
    expect(updated.queenHistory?.[0].breed).toBe(hive.queen.breed);
  });

  it('validates required fields', () => {
    const errors = validateQueenReplacementForm({
      date: '',
      reason: '',
      breed: '',
      line: '',
      year: 0,
      introducedAt: '',
      origin: '',
      status: 'caged',
      marked: false,
      clippedWing: false,
      note: ''
    });

    expect(errors.length).toBeGreaterThan(0);
  });
});
