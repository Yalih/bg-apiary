import { describe, expect, it } from 'vitest';
import { BGS_VISUAL_ANIMATIONS } from '../logic/bgsVisual20';

describe('Premium animations 2.0', () => {
  it('defines subtle animations only', () => {
    expect(BGS_VISUAL_ANIMATIONS).toEqual(expect.arrayContaining(['fade','slide','hover','active','skeleton']));
  });
});
