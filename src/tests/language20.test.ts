import { describe, expect, it } from 'vitest';
import { RC_POLISH_TERMS } from '../logic/designSystem20';

describe('Polish language 2.0 RC', () => {
  it('uses Polish terms for visible platform concepts', () => {
    expect(RC_POLISH_TERMS.dashboard).toBe('Panel');
    expect(RC_POLISH_TERMS.sync).toBe('Synchronizacja');
    expect(RC_POLISH_TERMS.auditLog).toBe('Dziennik zmian');
    expect(RC_POLISH_TERMS.permissions).toBe('Uprawnienia');
    expect(RC_POLISH_TERMS.sharing).toBe('Współdzielenie');
  });
});
