import { describe, expect, it } from 'vitest';
import { EMPTY_STATES, ICONS, SEMANTIC_COLORS } from '../logic/uxSystem';

describe('ux consistency 1.5', () => {
  it('keeps stable icon dictionary', () => {
    expect(ICONS.start).toBe('🏠');
    expect(ICONS.work).toBe('✅');
    expect(ICONS.apiaries).toBe('🐝');
    expect(ICONS.queens).toBe('👑');
    expect(ICONS.reports).toBe('📊');
    expect(ICONS.backup).toBe('💾');
  });

  it('keeps semantic color dictionary', () => {
    expect(SEMANTIC_COLORS.ok).toBe('zielony');
    expect(SEMANTIC_COLORS.urgent).toBe('czerwony');
    expect(SEMANTIC_COLORS.brand).toContain('miód');
  });

  it('defines empty states with actions', () => {
    expect(EMPTY_STATES.tasksToday.action).toBeTruthy();
    expect(EMPTY_STATES.hives.icon).toBe('🐝');
  });
});
