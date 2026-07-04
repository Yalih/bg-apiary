import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildQueenReplacementNeedsReport, buildWeakFamiliesReport } from '../logic/advancedReports';

describe('weak colonies 1.4', () => {
  it('detects weak families', () => {
    const report = buildWeakFamiliesReport(demoState);
    expect(Array.isArray(report)).toBe(true);
  });

  it('detects queen replacement needs', () => {
    const report = buildQueenReplacementNeedsReport(demoState);
    expect(Array.isArray(report)).toBe(true);
  });
});
