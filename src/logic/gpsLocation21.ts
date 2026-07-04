export const GPS_LOCATION_VERSION = '2.1-gps-location-audit';

export type GpsLocationResult21 = {
  latitude: number;
  longitude: number;
  accuracy?: number;
  capturedAt: string;
};

export type GpsLocationError21 =
  | 'unsupported'
  | 'permission-denied'
  | 'unavailable'
  | 'timeout'
  | 'unknown';

export function isGpsSupported21(): boolean {
  return typeof navigator !== 'undefined' && 'geolocation' in navigator;
}

export function mapGpsError21(error: GeolocationPositionError | unknown): GpsLocationError21 {
  const code = typeof error === 'object' && error && 'code' in error ? Number((error as GeolocationPositionError).code) : 0;
  if (code === 1) return 'permission-denied';
  if (code === 2) return 'unavailable';
  if (code === 3) return 'timeout';
  return 'unknown';
}

export function getGpsErrorMessage21(error: GpsLocationError21): string {
  if (error === 'unsupported') return 'Ta przeglądarka nie obsługuje lokalizacji GPS.';
  if (error === 'permission-denied') return 'Nie udzielono zgody na lokalizację GPS.';
  if (error === 'unavailable') return 'Nie udało się odczytać lokalizacji GPS.';
  if (error === 'timeout') return 'Odczyt GPS trwał zbyt długo.';
  return 'Nie udało się pobrać lokalizacji GPS.';
}

export function requestGpsLocation21(timeoutMs = 12000): Promise<GpsLocationResult21> {
  if (!isGpsSupported21()) {
    return Promise.reject(new Error(getGpsErrorMessage21('unsupported')));
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: Number(position.coords.latitude.toFixed(6)),
          longitude: Number(position.coords.longitude.toFixed(6)),
          accuracy: position.coords.accuracy,
          capturedAt: new Date().toISOString()
        });
      },
      error => reject(new Error(getGpsErrorMessage21(mapGpsError21(error)))),
      {
        enableHighAccuracy: true,
        timeout: timeoutMs,
        maximumAge: 60000
      }
    );
  });
}

export function buildGpsLocationLabel21(result: GpsLocationResult21): string {
  const accuracy = typeof result.accuracy === 'number' ? ` · dokładność ~${Math.round(result.accuracy)} m` : '';
  return `GPS ${result.latitude.toFixed(5)}, ${result.longitude.toFixed(5)}${accuracy}`;
}
