import { describe, expect, it } from 'vitest';
import { buildDashboardWeatherCard } from '../logic/weatherAccuracy21';

describe('dashboard weather card 2.1', () => {
  it('uses honest source labels', () => {
    const card = buildDashboardWeatherCard({ source: 'missing-location', recommendation: 'Dodaj lokalizację pasieki, aby pokazać dokładną pogodę', score: 'niezalecane' });
    expect(card.title).toBe('Brak lokalizacji pasieki');
    expect(card.sourceLabel).toContain('Brak lokalizacji');
  });
});
