import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildApiaryReports14 } from '../logic/advancedReports';

describe('apiary report 1.4', () => {
  it('builds apiary reports and grades', () => {
    const reports = buildApiaryReports14(demoState);
    expect(reports.length).toBe(demoState.apiaries.length);
    expect(['A', 'B', 'C', 'D']).toContain(reports[0].grade);
  });
});
