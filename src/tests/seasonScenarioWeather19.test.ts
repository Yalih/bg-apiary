import { describe, expect, it } from 'vitest';
import { SEASON_SCENARIOS, createSeasonPlan, getScenarioRecommendations } from '../logic/seasonPlanner';

describe('season scenarios and weather windows 1.9', () => {
  it('keeps scenario recommendations', () => {
    const plan = createSeasonPlan(2027, 'amatorska', 'odklady');
    expect(SEASON_SCENARIOS.some(item => item.value === 'odklady')).toBe(true);
    expect(getScenarioRecommendations(plan)[0]).toContain('ramki');
  });

  it('adds weather windows to inspection and harvest tasks', () => {
    const plan = createSeasonPlan(2027, 'amatorska', 'produkcja_miodu');
    const weatherItems = plan.items.filter(item => item.weatherWindow);
    expect(weatherItems.length).toBeGreaterThan(0);
    expect(weatherItems[0].weatherWindow?.noRain).toBe(true);
  });
});
