import { describe, expect, it } from 'vitest';
import { createEmptyState } from '../storage/emptyState';

describe('season migration 1.9', () => {
  it('empty state includes season plans', () => {
    const state = createEmptyState();
    expect(state.seasonPlans).toEqual([]);
  });
});
