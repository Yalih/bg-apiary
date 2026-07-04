import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { auditChange, createAuditLogEntry } from '../logic/audit20';

describe('audit log 2.0', () => {
  it('creates audit log entry and adds it to state', () => {
    const entry = createAuditLogEntry({ userId: 'u1', userEmail: 'a@b.pl', action: 'update', entityType: 'hive', entityId: 'h1', summary: 'Zmiana ula' });
    const state = auditChange(demoState, 'u1', 'a@b.pl', 'update', 'hive', 'h1', 'Zmiana ula');
    expect(entry.id).toContain('audit-');
    expect(state.auditLog).toHaveLength(1);
  });
});
