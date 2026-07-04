import { describe, expect, it } from 'vitest';
import { buildDashboardApiaries21 } from '../logic/apiaryLocation21';

describe('dashboard does not show hives as main 2.1', () => {
  it('builds dashboard around apiaries, not individual hives', () => {
    const state = {
      apiaries: [{ id: 'a1', name: 'Pasieka', location: '', description: '', imageEmoji: '' }],
      hives: [{ id: 'h1', apiaryId: 'a1', strength: 8, queen: { status: 'mated' } }],
      tasks: []
    } as any;
    const cards = buildDashboardApiaries21(state);
    expect(cards).toHaveLength(1);
    expect(cards[0].hiveCount).toBe(1);
  });
});
