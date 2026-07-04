import { describe, expect, it } from 'vitest';
import { BG_APIARY_ICON_ALIASES } from '../logic/bgApiaryAssets';

describe('hive details icons 2.0', () => {
  it('contains icons required by hive detail tiles', () => {
    expect(BG_APIARY_ICON_ALIASES.matka).toContain('matka');
    expect(BG_APIARY_ICON_ALIASES.czerw).toContain('czerw');
    expect(BG_APIARY_ICON_ALIASES.zapasy).toContain('zapasy');
    expect(BG_APIARY_ICON_ALIASES.temperatura).toContain('temperatura');
  });
});
