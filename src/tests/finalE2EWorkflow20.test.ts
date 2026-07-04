import { describe, expect, it } from 'vitest';
import { createEmptyState } from '../storage/emptyState';
import { createBackup, restoreBackup } from '../logic/backup';
import { recordFinalChange } from '../logic/finalAudit20';

describe('final workflow E2E-like 2.0', () => {
  it('simulates empty account, apiary, hive, inspection, backup and restore', () => {
    let state = createEmptyState();
    const apiary = { id: 'a1', name: 'Pasieka', location: 'Kolno', description: '', imageEmoji: '🐝' };
    const hive = {
      id: 'h1', apiaryId: 'a1', number: 1, name: 'Ul 1', type: 'WP', frameCount: 7, strength: 6, mood: 'normalna' as const, foodLevel: 'dobry' as const,
      queen: { introducedAt: '2026-01-01', breed: 'Krainka', line: 'Sklenar', year: 2026 },
      lastInspectionAt: '2026-07-01', nextAction: '', notes: ''
    };
    state = recordFinalChange({ ...state, apiaries: [apiary] }, 'u1', 'u@b.pl', 'create', 'apiary', apiary.id, 'Dodano pasiekę', undefined, apiary);
    state = recordFinalChange({ ...state, hives: [hive] }, 'u1', 'u@b.pl', 'create', 'hive', hive.id, 'Dodano ul', undefined, hive);
    state = { ...state, inspections: [{ id: 'i1', hiveId: 'h1', date: '2026-07-01', summary: 'OK', brood: 'jest', queenSeen: true, eggs: true, larvae: true, cappedBrood: true, cells: 0, strength: 6, mood: 'normalna', foodLevel: 'dobry', frameCount: 7 }] };
    const restored = restoreBackup(createBackup(state));
    expect(restored.apiaries).toHaveLength(1);
    expect(restored.hives).toHaveLength(1);
    expect(restored.inspections).toHaveLength(1);
    expect(restored.auditLog?.length).toBeGreaterThan(0);
  });
});
