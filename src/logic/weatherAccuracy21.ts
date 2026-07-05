import type { Apiary, ApiaryState, Hive } from '../models/apiary';

export const WEATHER_ACCURACY_VERSION = '2.1-weather-nectar-accuracy';
export const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
export const weatherSnapshotCache21 = new Map<string, string>();
const WEATHER_CACHE_PREFIX = 'bgapiary.weather21.';

export type WeatherWorkScore = 'idealnie' | 'mozliwe' | 'niezalecane';
export type ApiaryCoordinates = { latitude: number; longitude: number };

export type AccurateWeatherSnapshot = {
  source: 'open-meteo' | 'offline-cache' | 'missing-location';
  apiaryId?: string;
  apiaryName?: string;
  latitude?: number;
  longitude?: number;
  temperatureC?: number;
  apparentTemperatureC?: number;
  precipitationMm?: number;
  windKmh?: number;
  gustKmh?: number;
  humidityPct?: number;
  cloudCoverPct?: number;
  uvIndex?: number;
  recommendation: string;
  score: WeatherWorkScore;
  fetchedAt?: string;
  message?: string;
};

export function getApiaryCoordinates(apiary?: Apiary): ApiaryCoordinates | null {
  if (!apiary) return null;
  const anyApiary = apiary as any;
  const latitude = anyApiary.latitude ?? anyApiary.lat ?? anyApiary.location?.latitude ?? anyApiary.location?.lat ?? anyApiary.coordinates?.latitude ?? anyApiary.coordinates?.lat;
  const longitude = anyApiary.longitude ?? anyApiary.lng ?? anyApiary.lon ?? anyApiary.location?.longitude ?? anyApiary.location?.lng ?? anyApiary.location?.lon ?? anyApiary.coordinates?.longitude ?? anyApiary.coordinates?.lng ?? anyApiary.coordinates?.lon;
  if (typeof latitude === 'number' && typeof longitude === 'number') return { latitude, longitude };
  const parsedLat = Number(latitude);
  const parsedLon = Number(longitude);
  if (Number.isFinite(parsedLat) && Number.isFinite(parsedLon)) return { latitude: parsedLat, longitude: parsedLon };
  return null;
}

export function selectApiaryForWeather(state: ApiaryState, input?: { activeApiaryId?: string; hiveId?: string }): Apiary | null {
  if (input?.hiveId) {
    const hive = state.hives.find((item: Hive) => item.id === input.hiveId);
    const apiaryId = (hive as any)?.apiaryId;
    const fromHive = state.apiaries.find(apiary => apiary.id === apiaryId);
    if (fromHive) return fromHive;
  }
  if (input?.activeApiaryId) {
    const selected = state.apiaries.find(apiary => apiary.id === input.activeApiaryId);
    if (selected) return selected;
  }
  if (state.apiaries.length === 1) return state.apiaries[0];
  return state.apiaries[0] ?? null;
}

export function buildOpenMeteoUrl(coords: ApiaryCoordinates): string {
  const params = new URLSearchParams({
    latitude: String(coords.latitude),
    longitude: String(coords.longitude),
    current: [
      'temperature_2m',
      'apparent_temperature',
      'precipitation',
      'relative_humidity_2m',
      'cloud_cover',
      'wind_speed_10m',
      'wind_gusts_10m',
      'uv_index'
    ].join(','),
    hourly: [
      'temperature_2m',
      'precipitation',
      'wind_speed_10m',
      'relative_humidity_2m',
      'cloud_cover',
      'uv_index'
    ].join(','),
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
      'wind_speed_10m_max',
      'uv_index_max'
    ].join(','),
    forecast_days: '7',
    timezone: 'auto'
  });
  return `${OPEN_METEO_BASE_URL}?${params.toString()}`;
}

export function evaluateBeekeeperWeather(input: {
  temperatureC?: number;
  precipitationMm?: number;
  windKmh?: number;
  gustKmh?: number;
  cloudCoverPct?: number;
  uvIndex?: number;
}): { score: WeatherWorkScore; recommendation: string } {
  const temp = input.temperatureC ?? 0;
  const rain = input.precipitationMm ?? 0;
  const wind = input.windKmh ?? 0;
  const gust = input.gustKmh ?? wind;
  const uv = input.uvIndex ?? 0;

  if (rain > 0.3 || wind >= 28 || gust >= 42 || temp < 12 || temp >= 33) {
    return { score: 'niezalecane', recommendation: 'Lepiej odłożyć przegląd' };
  }
  if (temp >= 15 && rain <= 0.1 && wind <= 20 && gust <= 32 && uv < 8) {
    return { score: 'idealnie', recommendation: 'Dobre warunki do przeglądu' };
  }
  return { score: 'mozliwe', recommendation: 'Można pracować ostrożnie' };
}

export function buildMissingLocationWeather(apiary?: Apiary | null): AccurateWeatherSnapshot {
  return {
    source: 'missing-location',
    apiaryId: apiary?.id,
    apiaryName: apiary?.name,
    score: 'niezalecane',
    recommendation: 'Dodaj lokalizację pasieki, aby pokazać dokładną pogodę',
    message: 'Brak lokalizacji pasieki'
  };
}

export function parseOpenMeteoCurrent(apiary: Apiary, coords: ApiaryCoordinates, payload: any): AccurateWeatherSnapshot {
  const current = payload?.current ?? {};
  const snapshotBase = {
    source: 'open-meteo' as const,
    apiaryId: apiary.id,
    apiaryName: apiary.name,
    latitude: coords.latitude,
    longitude: coords.longitude,
    temperatureC: Number(current.temperature_2m),
    apparentTemperatureC: Number(current.apparent_temperature),
    precipitationMm: Number(current.precipitation ?? 0),
    windKmh: Number(current.wind_speed_10m ?? 0),
    gustKmh: Number(current.wind_gusts_10m ?? 0),
    humidityPct: Number(current.relative_humidity_2m ?? 0),
    cloudCoverPct: Number(current.cloud_cover ?? 0),
    uvIndex: Number(current.uv_index ?? 0),
    fetchedAt: new Date().toISOString()
  };
  const score = evaluateBeekeeperWeather(snapshotBase);
  return { ...snapshotBase, ...score };
}

export function getWeatherCacheKey(apiaryId: string): string {
  return `${WEATHER_CACHE_PREFIX}${apiaryId}`;
}

export function buildOfflineWeatherFromCache(apiary: Apiary, cached: AccurateWeatherSnapshot | null): AccurateWeatherSnapshot {
  if (!cached) return buildMissingLocationWeather(apiary);
  return {
    ...cached,
    source: 'offline-cache',
    message: cached.fetchedAt ? `Ostatnia prognoza z: ${cached.fetchedAt}` : 'Ostatnie dane offline'
  };
}

export function buildDashboardWeatherCard(snapshot: AccurateWeatherSnapshot) {
  return {
    title: snapshot.source === 'missing-location' ? 'Brak lokalizacji pasieki' : `${Math.round(snapshot.temperatureC ?? 0)}°C`,
    subtitle: snapshot.apiaryName ?? 'Pasieka',
    wind: `${Math.round(snapshot.windKmh ?? 0)} km/h`,
    rain: `${snapshot.precipitationMm ?? 0} mm`,
    recommendation: snapshot.recommendation,
    sourceLabel: snapshot.source === 'open-meteo'
      ? 'Dane pogodowe z Open-Meteo'
      : snapshot.source === 'missing-location'
        ? 'Brak lokalizacji pasieki'
        : snapshot.message ?? 'Ostatnie dane offline'
  };
}


export function readCachedWeather(apiaryId: string): AccurateWeatherSnapshot | null {
  try {
    const raw = weatherSnapshotCache21.get(getWeatherCacheKey(apiaryId));
    return raw ? JSON.parse(raw) as AccurateWeatherSnapshot : null;
  } catch {
    return null;
  }
}

export function writeCachedWeather(snapshot: AccurateWeatherSnapshot): void {
  if (!snapshot.apiaryId || typeof window === 'undefined') return;
  try {
    weatherSnapshotCache21.set(getWeatherCacheKey(snapshot.apiaryId), JSON.stringify(snapshot));
  } catch {
    // Cache może być niedostępny; aplikacja musi działać dalej.
  }
}

export async function fetchOpenMeteoWeatherForApiary(apiary: Apiary): Promise<AccurateWeatherSnapshot> {
  const coords = getApiaryCoordinates(apiary);
  if (!coords) return buildMissingLocationWeather(apiary);

  try {
    const response = await fetch(buildOpenMeteoUrl(coords));
    if (!response.ok) throw new Error(`Open-Meteo HTTP ${response.status}`);
    const payload = await response.json();
    const snapshot = parseOpenMeteoCurrent(apiary, coords, payload);
    writeCachedWeather(snapshot);
    return snapshot;
  } catch {
    return buildOfflineWeatherFromCache(apiary, readCachedWeather(apiary.id));
  }
}

export async function getAccurateWeatherForState(state: ApiaryState, input?: { activeApiaryId?: string; hiveId?: string }): Promise<AccurateWeatherSnapshot> {
  const apiary = selectApiaryForWeather(state, input);
  if (!apiary) return buildMissingLocationWeather(null);
  return fetchOpenMeteoWeatherForApiary(apiary);
}
