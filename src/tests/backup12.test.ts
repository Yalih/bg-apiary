import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { createBackup, restoreBackup } from '../logic/backup';

describe('backup 1.2', () => {
  it('keeps work tour data in backup', () => {
    const backup = createBackup({ ...demoState, workTours: [], workPreferences: { lastWorkFilter: 'feeding' } });
    expect(backup.version).toBe('2.0 FINAL');
    const restored = restoreBackup(backup);
    expect(restored.workTours).toEqual([]);
    expect(restored.workPreferences?.lastWorkFilter).toBe('feeding');
  });
});
