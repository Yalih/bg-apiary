import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { createBackup, restoreBackup } from '../logic/backup';

describe('backup 1.3', () => {
  it('keeps queen controls in backup', () => {
    const backup = createBackup({ ...demoState, queenControls: [] });
    expect(backup.version).toBe('2.0 FINAL');
    const restored = restoreBackup(backup);
    expect(restored.queenControls).toEqual([]);
  });
});
