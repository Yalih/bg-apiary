import { describe, expect, it } from 'vitest';
import { premiumDashboardPrinciples } from '../logic/premiumDashboard21';

describe('BgApiary 2.1 Premium Dashboard mobile', () => {
  it('prioritizes larger cards and clearer hierarchy', () => {
    expect(premiumDashboardPrinciples.largerCards).toBe(true);
    expect(premiumDashboardPrinciples.clearerHierarchy).toBe(true);
  });
});
