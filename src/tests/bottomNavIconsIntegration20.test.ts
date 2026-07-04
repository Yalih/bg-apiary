import { describe, expect, it } from 'vitest';
import { bottomNavItems } from '../components/BottomNav';

describe('bottom nav icons integration 2.0', () => {
  it('uses stable icon names', () => {
    expect(bottomNavItems.map(item => item.iconName)).toEqual(['pulpit', 'ule', 'zadania', 'planSezonu', 'wiecej']);
  });
});
