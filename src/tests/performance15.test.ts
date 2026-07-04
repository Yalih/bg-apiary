import { describe, expect, it } from 'vitest';
import { generateLargeTestState, measureOperation } from '../logic/largeData';
import { buildSeasonReport, buildWeakFamiliesReport, buildQueenReplacementNeedsReport, buildApiaryReports14 } from '../logic/advancedReports';
import { buildQueenCatalog } from '../logic/queenCatalog';
import { createBackup } from '../logic/backup';

describe('performance smoke 1.5', () => {
  it('builds reports on large data', () => {
    const state = generateLargeTestState(20, 15);

    const season = measureOperation(() => buildSeasonReport(state));
    const weak = measureOperation(() => buildWeakFamiliesReport(state));
    const queenNeeds = measureOperation(() => buildQueenReplacementNeedsReport(state));
    const apiaries = measureOperation(() => buildApiaryReports14(state));
    const queens = measureOperation(() => buildQueenCatalog(state));

    expect(season.result.hives).toBe(300);
    expect(weak.result.length).toBeGreaterThan(0);
    expect(queenNeeds.result.length).toBeGreaterThan(0);
    expect(apiaries.result.length).toBe(20);
    expect(queens.result.length).toBe(300);

    expect(season.durationMs).toBeLessThan(1000);
    expect(apiaries.durationMs).toBeLessThan(1000);
  });

  it('creates backup on large data', () => {
    const state = generateLargeTestState(10, 10);
    const backup = measureOperation(() => createBackup(state));

    expect(backup.result.version).toBe('2.0 FINAL');
    expect(backup.result.state.hives.length).toBe(100);
    expect(backup.durationMs).toBeLessThan(1000);
  });
});
