import { describe, expect, it } from 'vitest';

describe('apiary update state 2.1', () => {
  it('replaces only matching apiary', () => {
    const apiaries = [{ id: 'a1', name: 'A' }, { id: 'a2', name: 'B' }] as any[];
    const next = apiaries.map(item => item.id === 'a2' ? { ...item, latitude: 52 } : item);
    expect(next[0].latitude).toBeUndefined();
    expect(next[1].latitude).toBe(52);
  });
});
