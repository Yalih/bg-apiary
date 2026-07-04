import { describe, expect, it } from 'vitest';
import { createHoneyBatch, pourHoneyToJars, buildHoneyWarehouse } from '../logic/honey';
import { demoState } from '../data/demoData';

describe('honey warehouse 1.7', () => {
  it('pours honey to jars and builds warehouse', () => {
    const batch = createHoneyBatch({
      date: '2026-07-01',
      apiaryId: 'a1',
      hiveIds: [],
      honeyType: 'rzepakowy',
      color: 'jasny',
      weightKg: 20,
      moisturePercent: 18,
      location: 'magazyn',
      notes: '',
      sources: []
    }, []);

    const poured = pourHoneyToJars(batch, 500, 10, '2026-07-02');
    const warehouse = buildHoneyWarehouse({ ...demoState, honeyBatches: [poured.batch], honeyJarStocks: [poured.jarStock] });

    expect(poured.batch.remainingKg).toBe(15);
    expect(poured.jarStock.full).toBe(10);
    expect(warehouse.fullJars).toBe(10);
  });
});
