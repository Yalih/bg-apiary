import { describe, expect, it } from 'vitest';
import { UX_EMPTY_ACTIONS, getEmptyAction } from '../logic/uxRefresh20';

describe('empty states UX Refresh 2.0', () => {
  it('uses action-based empty states', () => {
    expect(getEmptyAction('apiaries')).toBe('Dodaj pierwszą pasiekę');
    expect(getEmptyAction('hives')).toBe('Dodaj pierwszy ul');
    Object.values(UX_EMPTY_ACTIONS).forEach(label => {
      expect(label).not.toContain('Brak danych');
      expect(label).not.toContain('Brak elementów');
      expect(label).not.toContain('Nie znaleziono');
    });
  });
});
