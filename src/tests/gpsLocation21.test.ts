import { describe, expect, it } from 'vitest';
import { buildGpsLocationLabel21, getGpsErrorMessage21, GPS_LOCATION_VERSION } from '../logic/gpsLocation21';

describe('gps location 2.1', () => {
  it('builds GPS label and error messages', () => {
    expect(GPS_LOCATION_VERSION).toBe('2.1-gps-location-audit');
    expect(buildGpsLocationLabel21({ latitude: 52.123456, longitude: 21.654321, accuracy: 12, capturedAt: '2026-07-04T00:00:00Z' })).toContain('GPS 52.12346, 21.65432');
    expect(getGpsErrorMessage21('permission-denied')).toContain('Nie udzielono zgody');
  });
});
