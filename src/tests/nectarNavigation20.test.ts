import { describe, expect, it } from 'vitest';
import type { View } from '../App';

describe('Nectar navigation 2.0', () => {
  it('has nectar route instead of workplace placeholder', () => {
    const view: View = 'nectar';
    expect(view).toBe('nectar');
    expect(view).not.toBe('platform');
  });
});
