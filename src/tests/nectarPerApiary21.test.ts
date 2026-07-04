import { describe, expect, it } from 'vitest';
import { buildDashboardApiaries21 } from '../logic/apiaryLocation21';

describe('nectar per apiary 2.1', () => {
  it('keeps manual nectar per apiary', () => {
    const state = { apiaries: [
      { id: 'a1', name: 'A', location: '', description: '', imageEmoji: '', nectarFlow: 'facelia' },
      { id: 'a2', name: 'B', location: '', description: '', imageEmoji: '', nectarFlow: 'gryka' }
    ], hives: [], tasks: [] } as any;
    const cards = buildDashboardApiaries21(state);
    expect(cards[0].nectar.name).toBe('facelia');
    expect(cards[1].nectar.name).toBe('gryka');
  });
});
