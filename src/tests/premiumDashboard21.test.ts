import { describe, expect, it } from 'vitest';
import { premiumDashboardLimits, premiumDashboardPrinciples, premiumDashboardSections, PREMIUM_DASHBOARD_VERSION } from '../logic/premiumDashboard21';

describe('BgApiary 2.1 Premium Dashboard', () => {
  it('defines focused dashboard sections and limits', () => {
    expect(PREMIUM_DASHBOARD_VERSION).toBe('2.1-premiumdashboard');
    expect(premiumDashboardSections).toEqual([
      'Hero',
      'Pogoda',
      'Pożytek',
      'Rekomendacja dnia',
      'Moje ule',
      'Najbliższe prace',
      'Alerty',
      'Asystent'
    ]);
    expect(premiumDashboardLimits.visibleHives).toBe(2);
    expect(premiumDashboardLimits.urgentTasks).toBe(2);
    expect(premiumDashboardPrinciples.minimumText).toBe(true);
  });
});
