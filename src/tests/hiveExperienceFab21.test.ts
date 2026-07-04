import { describe, expect, it } from 'vitest';
import { getHiveExperienceFabActions } from '../logic/premiumHiveExperience21';

describe('BgApiary 2.1 hive FAB', () => {
  it('keeps existing quick actions only', () => {
    expect(getHiveExperienceFabActions()).toEqual(['Przegląd', 'Karmienie', 'Matka', 'Zdjęcie', 'Notatka']);
  });
});
