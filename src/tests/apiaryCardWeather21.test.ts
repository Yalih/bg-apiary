import { describe, expect, it } from 'vitest';
import { buildDashboardApiaries21 } from '../logic/apiaryLocation21';

describe('apiary card weather 2.1', () => {
  it('shows weather card state per apiary', () => {
    const state = { apiaries: [{ id: 'a1', name: 'A', location: 'Kolno', description: '', imageEmoji: '', latitude: 52, longitude: 21 }], hives: [], tasks: [] } as any;
    const card = buildDashboardApiaries21(state)[0];
    expect(card.weatherCard.sourceLabel).toContain('Open-Meteo');
  });
});
