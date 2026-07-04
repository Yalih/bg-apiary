import { describe, expect, it } from 'vitest';
import { buildDashboardApiaries21 } from '../logic/apiaryLocation21';

describe('apiary card nectar 2.1', () => {
  it('calculates nectar for each apiary card', () => {
    const state = { apiaries: [{ id: 'a1', name: 'A', location: 'Kolno', description: '', imageEmoji: '', nectarFlow: 'lipa' }], hives: [], tasks: [] } as any;
    const card = buildDashboardApiaries21(state)[0];
    expect(card.nectar.name).toBe('lipa');
    expect(card.nectar.label).toBe('Pożytek wyliczony lokalnie');
  });
});
