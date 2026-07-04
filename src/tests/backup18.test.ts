import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { createBackup, restoreBackup } from '../logic/backup';

describe('backup 1.8', () => {
  it('keeps health and transfer data in backup', () => {
    const backup = createBackup({
      ...demoState,
      varroaMeasurements: [],
      treatments: [],
      healthChecks: [],
      hiveTransfers: [],
      hiveQuarantines: []
    });
    const restored = restoreBackup(backup);
    expect(backup.version).toBe('2.0 FINAL');
    expect(restored.varroaMeasurements).toEqual([]);
    expect(restored.treatments).toEqual([]);
    expect(restored.hiveTransfers).toEqual([]);
  });
});
