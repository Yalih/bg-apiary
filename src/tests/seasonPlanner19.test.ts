import { describe, expect, it } from 'vitest';
import { buildSeasonTemplateItems, createSeasonPlan, seasonPlanItemsToTasks } from '../logic/seasonPlanner';

describe('season planner 1.9', () => {
  it('creates season plan from template', () => {
    const plan = createSeasonPlan(2027, 'amatorska', 'produkcja_miodu');
    expect(plan.year).toBe(2027);
    expect(plan.items.length).toBeGreaterThan(10);
    expect(plan.goals.length).toBeGreaterThan(0);
  });

  it('generates automatic seasonal tasks', () => {
    const plan = createSeasonPlan(2027, 'towarowa', 'produkcja_miodu');
    const tasks = seasonPlanItemsToTasks(plan, 'apiary-1');
    expect(tasks.length).toBe(plan.items.length);
    expect(tasks[0].source).toBe('automatic');
  });

  it('builds template items for queen and split scenarios', () => {
    expect(buildSeasonTemplateItems(2027, 'produkcja_matek', 'hodowla_matek').some(item => item.category === 'queen')).toBe(true);
    expect(buildSeasonTemplateItems(2027, 'odklady', 'odklady').some(item => item.title.includes('odkład'))).toBe(true);
  });
});
