import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildSeasonSummary } from '../logic/seasonSummary';

describe('season summary 1.0', () => {
  it('builds season summary', () => {
    const summary = buildSeasonSummary(demoState, 2026);
    expect(summary.year).toBe(2026);
    expect(summary.inspections).toBeGreaterThan(0);
    expect(summary.feedings).toBeGreaterThan(0);
    expect(summary.totalFood).toBeGreaterThan(0);
  });

  it('finds notable hives', () => {
    const summary = buildSeasonSummary(demoState, 2026);
    expect(summary.strongestHive?.id).toBeTruthy();
    expect(summary.bestQueenLine).toBeTruthy();
  });
});
