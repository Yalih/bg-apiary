import { describe, expect, it } from 'vitest';
import { bgsFamilyStatus, bgsHiveStrengthPercent, bgsQueenColorLabel } from '../logic/bgsTheme20';

describe('BGS hive cards 2.0', () => {
  it('formats hive strength and status for cards', () => {
    expect(bgsHiveStrengthPercent(10)).toBe(100);
    expect(bgsHiveStrengthPercent(6)).toBe(60);
    expect(bgsFamilyStatus(10)).toBe('Bardzo silna rodzina');
    expect(bgsFamilyStatus(7)).toBe('Średnia rodzina');
    expect(bgsQueenColorLabel(2024)).toBeDefined();
  });
});
