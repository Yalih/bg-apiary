import { describe, expect, it } from 'vitest';
import { createHoneyBatch, mixHoneyBatches } from '../logic/honey';

describe('honey batch 1.7', () => {
  it('creates honey batch and mixed batch', () => {
    const first = createHoneyBatch({
      date: '2026-07-01',
      apiaryId: 'a1',
      hiveIds: ['h1'],
      honeyType: 'lipowy',
      color: 'złoty',
      weightKg: 10,
      moisturePercent: 18,
      location: 'magazyn',
      notes: '',
      sources: [{ hiveId: 'h1', apiaryId: 'a1', weightKg: 10 }]
    }, []);

    const second = createHoneyBatch({
      date: '2026-07-02',
      apiaryId: 'a1',
      hiveIds: ['h2'],
      honeyType: 'lipowy',
      color: 'złoty',
      weightKg: 5,
      moisturePercent: 17,
      location: 'magazyn',
      notes: '',
      sources: [{ hiveId: 'h2', apiaryId: 'a1', weightKg: 5 }]
    }, [first]);

    const mixed = mixHoneyBatches([first, second], '2026-07-03', [first, second]);
    expect(mixed.weightKg).toBe(15);
    expect(mixed.mixedFromBatchIds).toHaveLength(2);
    expect(mixed.sources).toHaveLength(2);
  });
});
