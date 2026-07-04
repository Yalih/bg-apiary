import { describe, expect, it } from 'vitest';
import { createBatchFromHarvest, createHoneyHarvest, generateBatchNumber, honeyTypeLabel } from '../logic/honey';

describe('honey harvest 1.7', () => {
  it('creates harvest and batch from harvest', () => {
    const harvest = createHoneyHarvest({
      date: '2026-07-01',
      apiaryId: 'a1',
      hiveIds: ['h1', 'h2'],
      honeyType: 'lipowy',
      framesCount: 12,
      weightBeforeKg: 40,
      weightAfterKg: 24,
      notes: 'OK'
    });

    const batch = createBatchFromHarvest(harvest, []);
    expect(batch.batchNumber).toBe('BG-2026-001');
    expect(batch.weightKg).toBe(24);
    expect(batch.sources).toHaveLength(2);
    expect(honeyTypeLabel('lipowy')).toBe('Lipowy');
  });

  it('generates sequential batch number', () => {
    const number = generateBatchNumber([{ batchNumber: 'BG-2026-001' } as any], new Date('2026-08-01'));
    expect(number).toBe('BG-2026-002');
  });
});
