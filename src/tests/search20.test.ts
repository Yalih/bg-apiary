import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { globalSearch20 } from '../logic/search20';

describe('global search 2.0 RC', () => {
  it('finds hives, apiaries and modules', () => {
    expect(globalSearch20(demoState, 'ul').length).toBeGreaterThan(0);
    expect(globalSearch20(demoState, 'raport')[0]?.type).toBe('modul');
  });
});
