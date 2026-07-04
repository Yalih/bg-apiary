import { describe, expect, it } from 'vitest';
import { BG_APIARY_ICON_ALIASES } from '../logic/bgApiaryAssets';

describe('dashboard icons integration 2.0', () => {
  it('contains aliases required by dashboard cards', () => {
    expect(BG_APIARY_ICON_ALIASES.pogoda).toContain('pogoda');
    expect(BG_APIARY_ICON_ALIASES.pozytek).toContain('pozytek');
    expect(BG_APIARY_ICON_ALIASES.zdrowie).toContain('zdrowie');
    expect(BG_APIARY_ICON_ALIASES.planSezonu).toContain('plan-sezonu');
  });
});
