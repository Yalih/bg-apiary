import { describe, expect, it } from 'vitest';
import { RC2_MAIN_USER_PATHS } from '../logic/rc2Integration20';

describe('main user paths 2.0 RC2', () => {
  it('documents the corrected main user paths', () => {
    expect(RC2_MAIN_USER_PATHS).toContain('nowy użytkownik → pusty Panel → dodaj pasiekę / importuj backup');
    expect(RC2_MAIN_USER_PATHS).toContain('użytkownik z danymi → Panel → najważniejsze prace / alerty / rekomendacje');
    expect(RC2_MAIN_USER_PATHS).toContain('użytkownik → Panel → wyszukiwarka → ul/pasieka/zadanie');
  });
});
