import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildFeedingStats14, buildInspectionStats14, buildWorkStats14, buildReportCharts14 } from '../logic/advancedReports';

describe('feeding and inspection stats 1.4', () => {
  it('builds feeding stats', () => {
    const stats = buildFeedingStats14(demoState);
    expect(stats.totalFeedings).toBe(demoState.feedings.length);
    expect(stats.totalAmount).toBeGreaterThanOrEqual(0);
  });

  it('builds inspection stats', () => {
    const stats = buildInspectionStats14(demoState);
    expect(stats.totalInspections).toBe(demoState.inspections.length);
  });

  it('builds work stats and chart data', () => {
    const stats = buildWorkStats14(demoState);
    const charts = buildReportCharts14(demoState);
    expect(stats.openTasks).toBeGreaterThanOrEqual(0);
    expect(charts.activity.length).toBeGreaterThan(0);
  });
});
