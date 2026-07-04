import { describe, expect, it } from 'vitest';
import { DASHBOARD20_TOKENS, hasDashboard20Token } from '../logic/dashboard20Quality';

describe('dashboard 2.0', () => {
  it('defines dashboard 2.0 quality tokens', () => {
    expect(hasDashboard20Token('Dashboard 2.0')).toBe(true);
    expect(DASHBOARD20_TOKENS).toContain('buildRecommendations20');
    expect(DASHBOARD20_TOKENS).toContain('buildPredictions20');
  });
});
