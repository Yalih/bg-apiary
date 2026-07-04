import { describe, expect, it } from 'vitest';
import { buildDefaultPermissionRules, canAccess } from '../logic/permissions20';

describe('permissions 2.0', () => {
  it('checks read/write/delete rights by role', () => {
    const rules = buildDefaultPermissionRules();
    expect(canAccess(rules, 'administrator', 'hives', 'delete')).toBe(true);
    expect(canAccess(rules, 'manager', 'hives', 'write')).toBe(true);
    expect(canAccess(rules, 'obserwator', 'hives', 'write')).toBe(false);
  });
});
