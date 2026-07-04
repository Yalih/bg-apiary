import { describe, expect, it } from 'vitest';
import { addNectarFlow, createSeasonPlan } from '../logic/seasonPlanner';

describe('season nectar flows 1.9', () => {
  it('adds custom nectar calendar for apiary', () => {
    let plan = createSeasonPlan(2027, 'wedrowna', 'produkcja_miodu');
    plan = addNectarFlow(plan, {
      apiaryId: 'a1',
      name: 'Lipa',
      startDate: '2027-06-15',
      endDate: '2027-07-10',
      expectedStrength: 'mocny',
      notes: ''
    });
    expect(plan.nectarFlows).toHaveLength(1);
    expect(plan.nectarFlows[0].name).toBe('Lipa');
  });
});
