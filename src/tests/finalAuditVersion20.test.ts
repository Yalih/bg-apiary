import { describe, expect, it } from 'vitest';
import { createEmptyState } from '../storage/emptyState';
import { recordFinalChange } from '../logic/finalAudit20';

describe('final audit and versioning 2.0', () => {
  it('records audit entry and data version for a write', () => {
    const state = recordFinalChange(createEmptyState(), 'u1', 'u@b.pl', 'create', 'hive', 'h1', 'Dodano ul', undefined, { id: 'h1' });
    expect(state.auditLog).toHaveLength(1);
    expect(state.dataVersions).toHaveLength(1);
    expect(state.auditLog?.[0].summary).toBe('Dodano ul');
    expect(state.dataVersions?.[0].version).toBe(1);
  });
});
