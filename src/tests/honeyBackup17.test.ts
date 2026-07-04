import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { createBackup, restoreBackup } from '../logic/backup';

describe('honey backup 1.7', () => {
  it('keeps honey data in backup', () => {
    const backup = createBackup({
      ...demoState,
      honeyHarvests: [],
      honeyBatches: [],
      honeyJarStocks: [],
      honeyCustomers: [],
      honeySales: [],
      honeyLabels: []
    });
    const restored = restoreBackup(backup);

    expect(backup.version).toBe('2.0 FINAL');
    expect(restored.honeyHarvests).toEqual([]);
    expect(restored.honeyBatches).toEqual([]);
    expect(restored.honeySales).toEqual([]);
  });
});
