import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildSalesReport, createHoneyBatch, pourHoneyToJars, sellHoney } from '../logic/honey';

describe('honey sales 1.7', () => {
  it('sells jars and updates report', () => {
    const batch = createHoneyBatch({
      date: '2026-07-01',
      apiaryId: 'a1',
      hiveIds: [],
      honeyType: 'akacjowy',
      color: 'jasny',
      weightKg: 10,
      moisturePercent: 17,
      location: 'magazyn',
      notes: '',
      sources: []
    }, []);
    const poured = pourHoneyToJars(batch, 500, 10, '2026-07-02');

    const state = sellHoney({ ...demoState, honeyBatches: [poured.batch], honeyJarStocks: [poured.jarStock], honeySales: [] }, {
      date: '2026-07-03',
      batchId: batch.id,
      jarSizeGrams: 500,
      jarsCount: 2,
      weightKg: 1,
      priceTotal: 60,
      paymentMethod: 'gotowka',
      notes: ''
    });

    expect(state.honeyJarStocks?.[0].sold).toBe(2);
    expect(buildSalesReport(state).totalValue).toBe(60);
  });
});
