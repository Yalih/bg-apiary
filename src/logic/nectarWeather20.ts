import type { ApiaryState, NectarFlow } from '../models/apiary';
import type { ApiaryWeather } from './weather20';

export type NectarFlowStage = 'start' | 'pełnia' | 'końcówka' | 'brak';
export type NectarFlowStrength = 'słaby' | 'średni' | 'mocny';

export interface ActiveNectarFlowSummary {
  name: string;
  stage: NectarFlowStage;
  strength: NectarFlowStrength;
  recommendation: string;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getActiveNectarFlow(state: ApiaryState, date = todayISO()): NectarFlow | undefined {
  const flows = (state.seasonPlans ?? []).flatMap(plan => plan.nectarFlows ?? []);
  return flows.find(flow => flow.startDate <= date && flow.endDate >= date);
}

export function getNectarStage(flow?: NectarFlow, date = todayISO()): NectarFlowStage {
  if (!flow) return 'brak';
  const start = new Date(flow.startDate).getTime();
  const end = new Date(flow.endDate).getTime();
  const now = new Date(date).getTime();
  const span = Math.max(1, end - start);
  const progress = (now - start) / span;
  if (progress < 0.25) return 'start';
  if (progress > 0.75) return 'końcówka';
  return 'pełnia';
}

export function estimateNectarStrength(flow: NectarFlow | undefined, weather: ApiaryWeather): NectarFlowStrength {
  if (!flow) return 'słaby';
  if (weather.precipitationMm > 0.2 || weather.windKmh > 30 || weather.temperatureC < 14) return 'słaby';
  if (weather.temperatureC >= 18 && weather.temperatureC <= 28 && weather.windKmh < 18 && weather.cloudCoverPercent < 70) return 'mocny';
  return 'średni';
}

export function buildNectarWeatherSummary(state: ApiaryState, weather: ApiaryWeather, date = todayISO()): ActiveNectarFlowSummary {
  const flow = getActiveNectarFlow(state, date);
  const stage = getNectarStage(flow, date);
  const strength = estimateNectarStrength(flow, weather);
  const name = flow?.name ?? 'Brak aktywnego pożytku';
  const recommendation = stage === 'brak'
    ? 'Brak aktywnego pożytku w kalendarzu'
    : strength === 'mocny'
      ? 'Pożytek mocny – kontroluj miejsce'
      : strength === 'średni'
        ? 'Pożytek średni – obserwuj rodziny'
        : 'Pożytek słaby – nie licz na duży przyrost';
  return { name, stage, strength, recommendation };
}
