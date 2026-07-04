import { describe, expect, it } from 'vitest';
import { buildOwnerDashboard } from '../logic/rcQuality20';
import { demoState } from '../data/demoData';
import { RC2_MAIN_VIEW, isRc2MainExperienceVisible } from '../logic/rc2Integration20';

describe('dashboard integration 2.0 RC2', () => {
  it('uses dashboard as main RC2 experience', () => {
    const dashboard = buildOwnerDashboard(demoState);
    expect(RC2_MAIN_VIEW).toBe('dashboard');
    expect(isRc2MainExperienceVisible()).toBe(true);
    expect(dashboard).toHaveProperty('notifications');
    expect(dashboard).toHaveProperty('dataQualityIssues');
  });
});
