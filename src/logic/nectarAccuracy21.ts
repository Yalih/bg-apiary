import type { Apiary, ApiaryState } from '../models/apiary';
import type { AccurateWeatherSnapshot } from './weatherAccuracy21';

export const NECTAR_ACCURACY_VERSION = '2.1-weather-nectar-accuracy';

export type NectarPhase = 'start' | 'pełnia' | 'końcówka' | 'brak';
export type NectarStrength = 'słaby' | 'średni' | 'mocny';

export type NectarCalendarItem = {
  name: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  baseStrength: NectarStrength;
};

export type CurrentNectarFlow = {
  name: string;
  phase: NectarPhase;
  strength: NectarStrength;
  source: 'manual' | 'local-calendar';
  recommendation: string;
  weatherAdjusted: boolean;
  label: string;
};

export const POLAND_NECTAR_CALENDAR: NectarCalendarItem[] = [
  { name: 'sad', startMonth: 4, startDay: 15, endMonth: 5, endDay: 10, baseStrength: 'średni' },
  { name: 'mniszek', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20, baseStrength: 'średni' },
  { name: 'rzepak', startMonth: 5, startDay: 1, endMonth: 5, endDay: 31, baseStrength: 'mocny' },
  { name: 'akacja', startMonth: 5, startDay: 25, endMonth: 6, endDay: 15, baseStrength: 'mocny' },
  { name: 'lipa', startMonth: 6, startDay: 15, endMonth: 7, endDay: 15, baseStrength: 'mocny' },
  { name: 'facelia', startMonth: 6, startDay: 10, endMonth: 8, endDay: 20, baseStrength: 'średni' },
  { name: 'gryka', startMonth: 7, startDay: 1, endMonth: 8, endDay: 15, baseStrength: 'średni' },
  { name: 'nawłoć', startMonth: 8, startDay: 10, endMonth: 9, endDay: 20, baseStrength: 'średni' },
  { name: 'wrzos', startMonth: 8, startDay: 15, endMonth: 9, endDay: 20, baseStrength: 'mocny' },
  { name: 'spadź', startMonth: 6, startDay: 1, endMonth: 8, endDay: 31, baseStrength: 'średni' }
];

function dayOfYear(month: number, day: number): number {
  const d = new Date(2026, month - 1, day);
  const start = new Date(2026, 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
}

export function getNectarPhase(item: NectarCalendarItem, date: Date = new Date()): NectarPhase {
  const now = dayOfYear(date.getMonth() + 1, date.getDate());
  const start = dayOfYear(item.startMonth, item.startDay);
  const end = dayOfYear(item.endMonth, item.endDay);
  if (now < start || now > end) return 'brak';
  const total = Math.max(1, end - start);
  const progress = (now - start) / total;
  if (progress < 0.25) return 'start';
  if (progress > 0.75) return 'końcówka';
  return 'pełnia';
}

export function findCalendarNectar(date: Date = new Date()): NectarCalendarItem | null {
  const active = POLAND_NECTAR_CALENDAR.filter(item => getNectarPhase(item, date) !== 'brak');
  if (!active.length) return null;
  const strengthRank = { słaby: 1, średni: 2, mocny: 3 } as const;
  return active.sort((a, b) => strengthRank[b.baseStrength] - strengthRank[a.baseStrength])[0];
}

export function getManualApiaryNectar(apiary?: Apiary | null): string | null {
  const anyApiary = apiary as any;
  const manual = anyApiary?.nectarFlow ?? anyApiary?.activeNectar ?? anyApiary?.currentNectar ?? anyApiary?.pozytek ?? anyApiary?.nectar?.current;
  if (typeof manual === 'string' && manual.trim()) return manual.trim();
  if (manual?.name) return String(manual.name);
  return null;
}

export function adjustNectarStrengthByWeather(strength: NectarStrength, weather?: AccurateWeatherSnapshot | null): NectarStrength {
  if (!weather || weather.source === 'missing-location') return strength;
  const temp = weather.temperatureC ?? 0;
  const rain = weather.precipitationMm ?? 0;
  const wind = weather.windKmh ?? 0;
  const uv = weather.uvIndex ?? 0;

  let score = { słaby: 1, średni: 2, mocny: 3 }[strength];
  if (rain > 0.3 || wind > 28 || temp < 13 || temp > 33) score -= 1;
  if (temp >= 18 && temp <= 28 && rain <= 0.1 && wind <= 20 && uv < 8) score += 1;
  score = Math.max(1, Math.min(3, score));
  return score === 3 ? 'mocny' : score === 2 ? 'średni' : 'słaby';
}

export function buildNectarRecommendation(strength: NectarStrength, phase: NectarPhase): string {
  if (phase === 'brak') return 'Brak aktywnego pożytku – nie zakładaj przyrostu';
  if (strength === 'mocny') return 'Pożytek mocny – kontroluj miejsce w ulu';
  if (strength === 'średni') return 'Pożytek średni – obserwuj rozwój rodzin';
  return 'Pożytek słaby – obserwuj zapasy';
}

export function getCurrentNectarFlow(state: ApiaryState, apiary?: Apiary | null, weather?: AccurateWeatherSnapshot | null, date: Date = new Date()): CurrentNectarFlow {
  const manual = getManualApiaryNectar(apiary);
  if (manual) {
    const adjusted = adjustNectarStrengthByWeather('średni', weather);
    const phase: NectarPhase = 'pełnia';
    return {
      name: manual,
      phase,
      strength: adjusted,
      source: 'manual',
      recommendation: buildNectarRecommendation(adjusted, phase),
      weatherAdjusted: Boolean(weather && weather.source !== 'missing-location'),
      label: 'Pożytek wyliczony lokalnie'
    };
  }

  const calendar = findCalendarNectar(date);
  if (!calendar) {
    return {
      name: 'Brak aktywnego pożytku',
      phase: 'brak',
      strength: 'słaby',
      source: 'local-calendar',
      recommendation: buildNectarRecommendation('słaby', 'brak'),
      weatherAdjusted: Boolean(weather && weather.source !== 'missing-location'),
      label: 'Pożytek wyliczony lokalnie'
    };
  }

  const phase = getNectarPhase(calendar, date);
  const adjusted = adjustNectarStrengthByWeather(calendar.baseStrength, weather);
  return {
    name: calendar.name,
    phase,
    strength: adjusted,
    source: 'local-calendar',
    recommendation: buildNectarRecommendation(adjusted, phase),
    weatherAdjusted: Boolean(weather && weather.source !== 'missing-location'),
    label: 'Pożytek wyliczony lokalnie'
  };
}
