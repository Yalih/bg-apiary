import { describe, expect, it } from 'vitest';
import { UX_DASHBOARD_LIMITS, limitDashboardItems } from '../logic/uxRefresh20';

describe('dashboard UX Refresh 2.0', () => {
  it('limits dashboard content instead of showing endless lists', () => {
    expect(UX_DASHBOARD_LIMITS.primarySections).toBeLessThanOrEqual(4);
    expect(limitDashboardItems([1,2,3,4,5], false)).toEqual([1,2,3]);
    expect(limitDashboardItems([1,2,3,4,5], true)).toEqual([1,2,3,4,5]);
  });
});
