import { describe, expect, it } from 'vitest';
import { RC2_POLISH_LABELS } from '../logic/rc2Integration20';

describe('polish labels 2.0 RC2', () => {
  it('keeps visible labels in Polish', () => {
    expect(RC2_POLISH_LABELS.dashboard).toBe('Panel');
    expect(RC2_POLISH_LABELS.backup).toBe('Kopia zapasowa');
    expect(RC2_POLISH_LABELS.sync).toBe('Synchronizacja');
    expect(RC2_POLISH_LABELS.auditLog).toBe('Dziennik zmian');
    expect(RC2_POLISH_LABELS.permissions).toBe('Uprawnienia');
    expect(RC2_POLISH_LABELS.sharing).toBe('Współdzielenie');
  });
});
