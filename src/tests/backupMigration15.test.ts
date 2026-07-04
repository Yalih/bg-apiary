import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { createBackup, restoreBackup } from '../logic/backup';

describe('backup migration 1.5', () => {
  it('keeps all modern state fields after restore', () => {
    const backup = createBackup(demoState);
    const restored = restoreBackup(backup);

    expect(backup.version).toBe('2.0 FINAL');
    expect(restored.queenControls).toBeDefined();
    expect(restored.workTours).toBeDefined();
    expect(restored.workPreferences).toBeDefined();
    expect(restored.decisionEvents).toBeDefined();
  });
});
