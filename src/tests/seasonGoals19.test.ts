import { describe, expect, it } from 'vitest';
import { buildSeasonReport19, createSeasonPlan, updateSeasonGoal } from '../logic/seasonPlanner';

describe('season goals 1.9', () => {
  it('updates goal and reports percent', () => {
    let plan = createSeasonPlan(2027, 'amatorska', 'produkcja_miodu');
    plan = updateSeasonGoal(plan, plan.goals[0].id, 5);
    const report = buildSeasonReport19(plan);
    expect(report.goalsProgress[0].current).toBe(5);
    expect(report.goalsProgress[0].percent).toBeGreaterThan(0);
  });
});
