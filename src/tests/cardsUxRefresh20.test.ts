import { describe, expect, it } from 'vitest';
import { UX_REFRESH_THEME } from '../logic/uxRefresh20';

describe('cards UX Refresh 2.0', () => {
  it('uses calm modern palette for cards and alerts', () => {
    expect(UX_REFRESH_THEME.palette).toContain('grafit');
    expect(UX_REFRESH_THEME.palette).toContain('zieleń');
    expect(UX_REFRESH_THEME.palette).toContain('czerwony alarmowy');
  });
});
