import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { globalSearch20 } from '../logic/search20';

describe('search integration 2.0 RC2', () => {
  it('finds core user objects from owner panel search', () => {
    expect(globalSearch20(demoState, 'ul').some(result => result.type === 'ul')).toBe(true);
    expect(globalSearch20(demoState, 'pasieka').length).toBeGreaterThan(0);
    expect(globalSearch20(demoState, 'raport').some(result => result.type === 'modul')).toBe(true);
  });
});
