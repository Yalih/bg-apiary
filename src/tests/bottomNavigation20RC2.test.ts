import { describe, expect, it } from 'vitest';
import { bottomNavItems } from '../components/BottomNav';
import { RC2_BOTTOM_NAV_LABELS } from '../logic/rc2Integration20';

describe('bottom navigation 2.0 RC2', () => {
  it('exposes main work modules directly', () => {
    expect(bottomNavItems.map(item => item.label)).toEqual([...RC2_BOTTOM_NAV_LABELS]);
    expect(bottomNavItems.map(item => item.view)).toEqual(['dashboard', 'apiaries', 'workCenter', 'assistant', 'more']);
  });
});
