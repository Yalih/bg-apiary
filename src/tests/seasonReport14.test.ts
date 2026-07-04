import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildSeasonReport } from '../logic/advancedReports';

describe('season report 1.4', () => {
  it('builds season report with core numbers', () => {
    const report = buildSeasonReport(demoState, 2026);
    expect(report.hives).toBe(demoState.hives.length);
    expect(report.apiaries).toBe(demoState.apiaries.length);
    expect(report.averageStrength).toBeGreaterThanOrEqual(0);
  });
});
