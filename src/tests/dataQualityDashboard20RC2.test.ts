import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildDataQualityReport, buildOwnerDashboard } from '../logic/rcQuality20';

describe('data quality dashboard 2.0 RC2', () => {
  it('connects data quality report to owner dashboard', () => {
    const issues = buildDataQualityReport(demoState);
    const dashboard = buildOwnerDashboard(demoState);
    expect(dashboard.dataQualityIssues).toBe(issues.length);
  });
});
