import { describe, expect, it } from 'vitest';
import { buildApiaryMapStats21 } from '../logic/apiaryMapPremium21';

describe('apiary map status legend 2.1', () => {
  it('counts missing positions separately', () => {
    const hives = [
      { id: 'h1', mapPosition: { row: 1, column: 1 }, strength: 8, queen: { status: 'mated' } },
      { id: 'h2', strength: 8, queen: { status: 'mated' } }
    ] as any;
    const stats = buildApiaryMapStats21(hives, []);
    expect(stats.ok).toBe(1);
    expect(stats.brakPozycji).toBe(1);
  });
});
