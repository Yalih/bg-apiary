import { describe, expect, it } from 'vitest';
import { buildDashboardApiaries21 } from '../logic/apiaryLocation21';

describe('dashboard shows apiaries 2.1', () => {
  it('builds apiary cards for dashboard', () => {
    const state = { apiaries: [{ id: 'a1', name: 'Pasieka', location: 'Kolno', description: '', imageEmoji: '', latitude: 52, longitude: 21 }], hives: [], tasks: [] } as any;
    expect(buildDashboardApiaries21(state)).toHaveLength(1);
    expect(buildDashboardApiaries21(state)[0].name).toBe('Pasieka');
  });
});
