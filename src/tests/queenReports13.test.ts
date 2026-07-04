import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildQueenReplacementReport } from '../logic/queenReports';

describe('queen reports 1.3', () => {
  it('builds queen report', () => {
    const report = buildQueenReplacementReport(demoState);
    expect(report.totalQueens).toBeGreaterThan(0);
    expect(report.currentQueens).toBeGreaterThan(0);
    expect(report.averageCurrentAgeMonths).toBeGreaterThanOrEqual(0);
  });
});
