import type { Apiary, ApiaryState } from '../models/apiary';
import { buildDashboardWeatherCard, buildMissingLocationWeather, getApiaryCoordinates } from './weatherAccuracy21';
import { getCurrentNectarFlow } from './nectarAccuracy21';

export const APIARY_LOCATION_VERSION = '2.1-apiary-location-dashboard-apiaries';

export type ApiaryLocationDraft21 = {
  locationName?: string;
  latitude?: number | '';
  longitude?: number | '';
};

export const apiaryLocationFields21 = ['locationName', 'latitude', 'longitude'] as const;

export function normalizeApiaryLocationInput(input: ApiaryLocationDraft21) {
  const latitude = input.latitude === '' || input.latitude === undefined ? undefined : Number(input.latitude);
  const longitude = input.longitude === '' || input.longitude === undefined ? undefined : Number(input.longitude);

  return {
    locationName: input.locationName?.trim() ?? '',
    latitude: Number.isFinite(latitude) ? latitude : undefined,
    longitude: Number.isFinite(longitude) ? longitude : undefined
  };
}

export function mergeApiaryLocation(apiary: Apiary, input: ApiaryLocationDraft21): Apiary {
  const normalized = normalizeApiaryLocationInput(input);
  return {
    ...apiary,
    ...(normalized.locationName ? { locationName: normalized.locationName } : {}),
    ...(normalized.latitude !== undefined ? { latitude: normalized.latitude } : {}),
    ...(normalized.longitude !== undefined ? { longitude: normalized.longitude } : {})
  } as Apiary;
}

export function getApiaryLocationLabel(apiary: Apiary): string {
  const anyApiary = apiary as any;
  const label = anyApiary.locationName ?? anyApiary.location?.name ?? anyApiary.locationDescription ?? anyApiary.city ?? anyApiary.address ?? '';
  if (typeof label === 'string' && label.trim()) return label.trim();
  const coords = getApiaryCoordinates(apiary);
  if (coords) return `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`;
  return 'Brak lokalizacji pasieki';
}

export function getApiaryHives(state: ApiaryState, apiaryId: string) {
  return state.hives.filter(hive => (hive as any).apiaryId === apiaryId);
}

export function getApiaryTasks(state: ApiaryState, apiaryId: string) {
  const hiveIds = new Set(getApiaryHives(state, apiaryId).map(hive => hive.id));
  return state.tasks.filter(task => !task.hiveId || hiveIds.has(task.hiveId));
}

export function buildApiaryDashboardCard21(state: ApiaryState, apiary: Apiary) {
  const hives = getApiaryHives(state, apiary.id);
  const tasks = getApiaryTasks(state, apiary.id);
  const coords = getApiaryCoordinates(apiary);
  const weather = coords
    ? {
        ...buildMissingLocationWeather(apiary),
        source: 'offline-cache' as const,
        latitude: coords.latitude,
        longitude: coords.longitude,
        temperatureC: 0,
        windKmh: 0,
        precipitationMm: 0,
        recommendation: 'Dane pogodowe z Open-Meteo',
        message: 'Dane pogodowe z Open-Meteo'
      }
    : buildMissingLocationWeather(apiary);
  const weatherCard = buildDashboardWeatherCard(weather);
  const nectar = getCurrentNectarFlow(state, apiary, weather);

  return {
    id: apiary.id,
    name: apiary.name,
    location: getApiaryLocationLabel(apiary),
    hiveCount: hives.length,
    taskCount: tasks.filter(task => task.status !== 'done').length,
    alertCount: hives.filter(hive => hive.strength < 4 || hive.queen.status === 'queenless' || hive.queen.status === 'suspected_lost').length,
    weather,
    weatherCard,
    nectar,
    hasLocation: Boolean(coords)
  };
}

export function buildDashboardApiaries21(state: ApiaryState) {
  return state.apiaries.map(apiary => buildApiaryDashboardCard21(state, apiary));
}
