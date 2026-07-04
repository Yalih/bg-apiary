import { describe, expect, it } from 'vitest';
import { limitDashboardItems } from '../logic/uxRefresh20';

describe('work center UX Refresh 2.0', () => {
  it('limits work list previews', () => {
    expect(limitDashboardItems(['a','b','c','d'])).toEqual(['a','b','c']);
  });
});
