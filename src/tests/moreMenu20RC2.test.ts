import { describe, expect, it } from 'vitest';
import { RC2_MORE_ADMIN_SECTIONS } from '../logic/rc2Integration20';

describe('more menu 2.0 RC2', () => {
  it('defines More as administration hub', () => {
    expect(RC2_MORE_ADMIN_SECTIONS).toContain('Konto i profil');
    expect(RC2_MORE_ADMIN_SECTIONS).toContain('Synchronizacja');
    expect(RC2_MORE_ADMIN_SECTIONS).toContain('Dziennik zmian');
    expect(RC2_MORE_ADMIN_SECTIONS).toContain('Kopia zapasowa');
  });
});
