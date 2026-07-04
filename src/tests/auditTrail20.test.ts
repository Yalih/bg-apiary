import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { auditChange } from '../logic/audit20';

describe('audit trail 2.0 RC', () => {
  it('stores who, when and what changed', () => {
    const state = auditChange(demoState, 'u1', 'u@b.pl', 'update', 'hive', 'h1', 'Zmiana testowa');
    expect(state.auditLog?.[0].userEmail).toBe('u@b.pl');
    expect(state.auditLog?.[0].summary).toBe('Zmiana testowa');
    expect(state.auditLog?.[0].date).toBeDefined();
  });
});
