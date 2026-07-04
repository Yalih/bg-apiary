import { describe, expect, it } from 'vitest';
import { bottomNavItems } from '../components/BottomNav';

describe('BGS bottom nav 2.0', () => {
  it('uses Pulpit/Ule/Plus/Plan/Więcej order', () => {
    expect(bottomNavItems.map(item => item.label)).toEqual(['Pulpit', 'Ule', '+', 'Plan', 'Więcej']);
    expect(bottomNavItems.map(item => item.view)).toEqual(['dashboard', 'apiaries', 'assistant', 'workCenter', 'more']);
  });
});
