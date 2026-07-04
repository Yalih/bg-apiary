import { describe, expect, it } from 'vitest';
import { getEmptyState, getModuleTheme, MODULE_THEME, RC_POLISH_TERMS } from '../logic/designSystem20';

describe('design system 2.0 RC', () => {
  it('defines module themes and Polish terminology', () => {
    expect(getModuleTheme('platform').label).toBe('Platforma');
    expect(MODULE_THEME.honey.color).toBe('złoty');
    expect(RC_POLISH_TERMS.backup).toBe('Kopia zapasowa');
  });

  it('defines improved empty states', () => {
    expect(getEmptyState('hives')).toContain('Dodaj pierwszy ul');
    expect(getEmptyState('inventory')).toContain('Magazyn');
  });
});
