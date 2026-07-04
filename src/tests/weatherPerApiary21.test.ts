import { describe, expect, it } from 'vitest';
import { buildDashboardApiaries21 } from '../logic/apiaryLocation21';

describe('weather per apiary 2.1', () => {
  it('keeps different coordinates per apiary', () => {
    const state = { apiaries: [
      { id: 'a1', name: 'A', location: '', description: '', imageEmoji: '', latitude: 52, longitude: 21 },
      { id: 'a2', name: 'B', location: '', description: '', imageEmoji: '', latitude: 53, longitude: 22 }
    ], hives: [], tasks: [] } as any;
    const cards = buildDashboardApiaries21(state);
    expect(cards[0].weather.latitude).toBe(52);
    expect(cards[1].weather.latitude).toBe(53);
  });
});
