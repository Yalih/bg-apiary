import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildDataQualityReport, buildOwnerDashboard } from '../logic/rcQuality20';

describe('data quality 2.0 RC', () => {
  it('detects incomplete data and owner dashboard metrics', () => {
    const issues = buildDataQualityReport(demoState);
    const dashboard = buildOwnerDashboard(demoState);
    expect(Array.isArray(issues)).toBe(true);
    expect(dashboard.dataQualityIssues).toBe(issues.length);
  });
});
