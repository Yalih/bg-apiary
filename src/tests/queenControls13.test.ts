import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { createQueenControl, getQueenKey, queenStatusLabel } from '../logic/queenCatalog';

describe('queen controls 1.3', () => {
  it('creates queen control linked to current queen', () => {
    const hive = demoState.hives[0];
    const control = createQueenControl(hive, {
      date: '2026-07-05',
      controlType: 'manual',
      status: 'accepted',
      eggsSeen: true,
      broodSeen: true,
      queenSeen: true,
      note: 'OK'
    });

    expect(control.hiveId).toBe(hive.id);
    expect(control.queenKey).toBe(getQueenKey(hive.queen, hive.id));
  });

  it('labels queen status', () => {
    expect(queenStatusLabel('accepted')).toBe('Przyjęta');
  });
});
