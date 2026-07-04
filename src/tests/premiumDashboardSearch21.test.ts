import { describe, expect, it } from 'vitest';
import { premiumDashboardLimits } from '../logic/premiumDashboard21';

describe('BgApiary 2.1 Premium Dashboard search', () => {
  it('keeps search results compact', () => {
    expect(premiumDashboardLimits.searchResults).toBeLessThanOrEqual(4);
  });
});
