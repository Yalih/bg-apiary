import { describe, expect, it } from 'vitest';
import { generateLargeTestState } from '../logic/largeData';

describe('large data generator 1.5', () => {
  it('generates large apiary state', () => {
    const state = generateLargeTestState(20, 15);

    expect(state.apiaries).toHaveLength(20);
    expect(state.hives).toHaveLength(300);
    expect(state.inspections.length).toBe(3000);
    expect(state.feedings.length).toBe(2100);
    expect(state.tasks.length).toBe(1800);
    expect(state.notes.length).toBe(300);
  });
});
