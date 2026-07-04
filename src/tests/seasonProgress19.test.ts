import { describe, expect, it } from 'vitest';
import { buildSeasonReport19, calculateSeasonProgress, createSeasonPlan, markSeasonItemDone } from '../logic/seasonPlanner';

describe('season progress 1.9', () => {
  it('calculates progress and report', () => {
    let plan = createSeasonPlan(2027, 'amatorska', 'produkcja_miodu');
    plan = markSeasonItemDone(plan, plan.items[0].id);
    const progress = calculateSeasonProgress(plan);
    const report = buildSeasonReport19(plan);

    expect(progress).toBeGreaterThan(0);
    expect(report.done).toBe(1);
    expect(report.progress).toBe(progress);
  });
});
