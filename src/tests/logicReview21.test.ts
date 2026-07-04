import { describe, expect, it } from 'vitest';
import { APIARY_LOCATION_VERSION } from '../logic/apiaryLocation21';
import { WEATHER_ACCURACY_VERSION } from '../logic/weatherAccuracy21';
import { NECTAR_ACCURACY_VERSION } from '../logic/nectarAccuracy21';
import { APIARY_MAP_PREMIUM_VERSION } from '../logic/apiaryMapPremium21';

describe('logic review 2.1', () => {
  it('keeps weather, nectar, apiary and map logic aligned', () => {
    expect(APIARY_LOCATION_VERSION).toContain('apiary-location');
    expect(WEATHER_ACCURACY_VERSION).toContain('weather');
    expect(NECTAR_ACCURACY_VERSION).toContain('weather');
    expect(APIARY_MAP_PREMIUM_VERSION).toContain('apiary-map');
  });
});
