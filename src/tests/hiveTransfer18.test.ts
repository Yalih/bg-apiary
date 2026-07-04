import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { transferHive } from '../logic/health';

describe('hive transfer 1.8', () => {
  it('moves hive between apiaries with queen and strength snapshot', () => {
    const hive = demoState.hives[0];
    const targetApiary = demoState.apiaries.find(apiary => apiary.id !== hive.apiaryId) ?? demoState.apiaries[0];
    const state = transferHive(demoState, {
      hiveId: hive.id,
      fromApiaryId: hive.apiaryId,
      toApiaryId: targetApiary.id,
      date: '2026-07-01',
      reason: 'pożytek',
      notes: 'test'
    });
    const moved = state.hives.find(item => item.id === hive.id);
    expect(moved?.apiaryId).toBe(targetApiary.id);
    expect(state.hiveTransfers?.[0].queenSnapshot.breed).toBe(hive.queen.breed);
    expect(state.hiveTransfers?.[0].strengthSnapshot).toBe(hive.strength);
  });
});
