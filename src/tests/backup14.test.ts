import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { createBackup, restoreBackup } from '../logic/backup';
import { buildSeasonReport } from '../logic/advancedReports';

describe('backup 1.4', () => {
  it('keeps compatibility with report data', () => {
    const backup = createBackup(demoState);
    const restored = restoreBackup(backup);
    const report = buildSeasonReport(restored);
    expect(backup.version).toBe('2.0 FINAL');
    expect(report.hives).toBe(restored.hives.length);
  });
});
