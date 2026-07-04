import type { ApiaryState } from '../models/apiary';

export type WeatherInspectionStatus = 'idealnie' | 'możliwe' | 'niezalecane';

export interface WeatherCoordinates {
  latitude: number;
  longitude: number;
  label: string;
}

export interface ApiaryWeather {
  temperatureC: number;
  precipitationMm: number;
  windKmh: number;
  humidityPercent: number;
  uvIndex: number;
  cloudCoverPercent: number;
  status: WeatherInspectionStatus;
  recommendation: string;
  fetchedAt: string;
  source: 'open-meteo' | 'cache' | 'fallback';
}

export const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
export const WEATHER_CACHE_PREFIX = 'bgapiary.weather.';

export function parseApiaryCoordinates(location?: string): WeatherCoordinates | undefined {
  if (!location) return undefined;
  const match = location.match(/(-?\d{1,2}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)/);
  if (!match) return undefined;
  return {
    latitude: Number(match[1]),
    longitude: Number(match[2]),
    label: location
  };
}

export function getFallbackCoordinates(): WeatherCoordinates {
  return { latitude: 52.2297, longitude: 21.0122, label: 'Warszawa – lokalizacja zastępcza' };
}

export function buildOpenMeteoUrl(coords: WeatherCoordinates): string {
  const params = new URLSearchParams({
    latitude: String(coords.latitude),
    longitude: String(coords.longitude),
    current: 'temperature_2m,relative_humidity_2m,precipitation,cloud_cover,wind_speed_10m,uv_index',
    timezone: 'auto'
  });
  return `${OPEN_METEO_BASE_URL}?${params.toString()}`;
}

export function evaluateBeekeeperWeather(input: Pick<ApiaryWeather, 'temperatureC' | 'precipitationMm' | 'windKmh' | 'humidityPercent' | 'uvIndex' | 'cloudCoverPercent'>): Pick<ApiaryWeather, 'status' | 'recommendation'> {
  const rain = input.precipitationMm > 0.2;
  const cold = input.temperatureC < 15;
  const wind = input.windKmh > 25;
  const hot = input.temperatureC > 32 || input.uvIndex >= 8;

  if (rain || cold || wind) {
    return { status: 'niezalecane', recommendation: 'Lepiej odłożyć prace' };
  }
  if (hot || input.cloudCoverPercent > 80 || input.humidityPercent > 85) {
    return { status: 'możliwe', recommendation: 'Warunki możliwe, pracuj krótko' };
  }
  return { status: 'idealnie', recommendation: 'Dobre warunki do przeglądu' };
}

export function normalizeOpenMeteoResponse(data: any): ApiaryWeather {
  const current = data?.current ?? {};
  const base = {
    temperatureC: Number(current.temperature_2m ?? 20),
    precipitationMm: Number(current.precipitation ?? 0),
    windKmh: Number(current.wind_speed_10m ?? 0),
    humidityPercent: Number(current.relative_humidity_2m ?? 60),
    uvIndex: Number(current.uv_index ?? 0),
    cloudCoverPercent: Number(current.cloud_cover ?? 0)
  };
  const evaluation = evaluateBeekeeperWeather(base);
  return {
    ...base,
    ...evaluation,
    fetchedAt: new Date().toISOString(),
    source: 'open-meteo'
  };
}

export function weatherCacheKey(apiaryId: string): string {
  return `${WEATHER_CACHE_PREFIX}${apiaryId}`;
}

export function saveWeatherCache(apiaryId: string, weather: ApiaryWeather, storage: Storage = localStorage): void {
  storage.setItem(weatherCacheKey(apiaryId), JSON.stringify(weather));
}

export function readWeatherCache(apiaryId: string, storage: Storage = localStorage): ApiaryWeather | undefined {
  const raw = storage.getItem(weatherCacheKey(apiaryId));
  if (!raw) return undefined;
  try {
    return { ...JSON.parse(raw), source: 'cache' };
  } catch {
    return undefined;
  }
}

export function fallbackWeather(): ApiaryWeather {
  const base = {
    temperatureC: 22,
    precipitationMm: 0,
    windKmh: 8,
    humidityPercent: 62,
    uvIndex: 4,
    cloudCoverPercent: 20
  };
  return {
    ...base,
    ...evaluateBeekeeperWeather(base),
    fetchedAt: new Date().toISOString(),
    source: 'fallback'
  };
}

export async function fetchApiaryWeather(apiaryId: string, coords: WeatherCoordinates, storage: Storage = localStorage): Promise<ApiaryWeather> {
  try {
    const response = await fetch(buildOpenMeteoUrl(coords));
    if (!response.ok) throw new Error(`Open-Meteo ${response.status}`);
    const weather = normalizeOpenMeteoResponse(await response.json());
    saveWeatherCache(apiaryId, weather, storage);
    return weather;
  } catch {
    return readWeatherCache(apiaryId, storage) ?? fallbackWeather();
  }
}

export function getCurrentApiaryCoordinates(state: ApiaryState): WeatherCoordinates {
  const apiary = state.apiaries[0];
  return parseApiaryCoordinates(apiary?.location) ?? getFallbackCoordinates();
}
