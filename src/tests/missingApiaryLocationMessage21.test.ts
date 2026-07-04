import { describe, expect, it } from 'vitest';
import { buildDashboardApiaries21 } from '../logic/apiaryLocation21';

describe('missing apiary location message 2.1', () => {
  it('shows honest missing location message', () => {
    const state = { apiaries: [{ id: 'a1', name: 'A', location: '', description: '', imageEmoji: '' }], hives: [], tasks: [] } as any;
    const card = buildDashboardApiaries21(state)[0];
    expect(card.hasLocation).toBe(false);
    expect(card.weatherCard.sourceLabel).toBe('Brak lokalizacji pasieki');
  });
});
