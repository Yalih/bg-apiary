import { describe, expect, it } from 'vitest';
import { getHeroHive, getMiniHive, getHiveOverlay, getWeatherAsset, getNectarAsset } from '../logic/bgApiaryAssets';

describe('Asset mapping 2.0', () => {
  it('maps assets through functions only', () => {
    expect(getHeroHive({ strength: 10 })).toContain('/hive/hero/');
    expect(getMiniHive({ strength: 10 }, 64)).toContain('/hive/mini/64/');
    expect(getHiveOverlay({ alarm: true })).toContain('/overlays/alarm.png');
    expect(getWeatherAsset('rain')).toContain('/weather/');
    expect(getNectarAsset('lipa')).toContain('/nectar/');
  });
});
