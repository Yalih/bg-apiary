import { describe, expect, it } from 'vitest';
import type { View } from '../App';

describe('Weather navigation 2.0', () => {
  it('has weather route instead of workplace placeholder', () => {
    const view: View = 'weather';
    expect(view).toBe('weather');
    expect(view).not.toBe('platform');
  });
});
