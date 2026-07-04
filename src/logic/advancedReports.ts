import type { Apiary, ApiaryState, FamilyStatus, Hive } from '../models/apiary';
import { buildQueenReplacementReport } from './queenReports';
import { getDailyWorkStats } from './workTour';
import { normalizeFamilyStatus } from './hiveFilters';
import { getOpenTasks, isTaskOverdue } from './tasks';

export interface SeasonReport {
  year: number;
  apiaries: number;
  hives: number;
  queens: number;
  replacements: number;
  inspections: number;
  feedings: number;
  tasks: number;
  openTasks: number;
  overdueTasks: number;
  alerts: number;
  averageStrength: number;
  averageQueenAgeMonths: number;
  familiesNeedingAction: number;
}

export interface ApiaryReport14 {
  apiary: Apiary;
  hiveCount: number;
  averageStrength: number;
  averageQueenAgeMonths: number;
  openTasks: number;
  overdueTasks: number;
  alerts: number;
  lastInspectionAt: string;
  lastFeedingAt: string;
  grade: 'A' | 'B' | 'C' | 'D';
}

export interface WeakFamilyReportItem {
  hive: Hive;
  apiaryName: string;
  reasons: string[];
  urgency: number;
}

export interface QueenReplacementNeedItem {
  hive: Hive;
  apiaryName: string;
  queenAgeMonths: number;
  reasons: string[];
  urgency: number;
}

export interface WorkStats14 {
  completedTasks: number;
  openTasks: number;
  overdueTasks: number;
  automaticTasks: number;
  byCategory: Record<string, number>;
}

export interface FeedingStats14 {
  totalFeedings: number;
  totalAmount: number;
  averagePerHive: number;
  lastFeedingAt: string;
}

export interface InspectionStats14 {
  totalInspections: number;
  averageGapDays: number;
  lastInspectionAt: string;
}

function average(values: number[]): number {
  if (!values.length) return 0;
  return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 10) / 10;
}

function dateMax(values: string[]): string {
  return values.filter(Boolean).sort((a, b) => b.localeCompare(a))[0] ?? 'brak danych';
}

function monthsSince(date: string, now = new Date()): number {
  const value = new Date(`${date}T12:00:00`);
  return Math.max(0, (now.getFullYear() - value.getFullYear()) * 12 + now.getMonth() - value.getMonth());
}

export function buildSeasonReport(state: ApiaryState, year = new Date().getFullYear()): SeasonReport {
  const queenReport = buildQueenReplacementReport(state);
  const openTasks = getOpenTasks(state.tasks);
  const overdueTasks = openTasks.filter(task => isTaskOverdue(task));
  const alerts = state.hives.filter(hive => hive.strength <= 4 || normalizeFamilyStatus(hive) === 'queen_replacement' || normalizeFamilyStatus(hive) === 'queenless').length;

  return {
    year,
    apiaries: state.apiaries.length,
    hives: state.hives.length,
    queens: queenReport.currentQueens,
    replacements: queenReport.replacedQueens,
    inspections: state.inspections.filter(item => item.date.startsWith(String(year))).length,
    feedings: state.feedings.filter(item => item.date.startsWith(String(year))).length,
    tasks: state.tasks.length,
    openTasks: openTasks.length,
    overdueTasks: overdueTasks.length,
    alerts,
    averageStrength: average(state.hives.map(hive => hive.strength)),
    averageQueenAgeMonths: queenReport.averageCurrentAgeMonths,
    familiesNeedingAction: buildWeakFamiliesReport(state).length + buildQueenReplacementNeedsReport(state).length
  };
}

export function buildApiaryReports14(state: ApiaryState): ApiaryReport14[] {
  return state.apiaries.map(apiary => {
    const hives = state.hives.filter(hive => hive.apiaryId === apiary.id);
    const tasks = state.tasks.filter(task => task.apiaryId === apiary.id);
    const openTasks = getOpenTasks(tasks);
    const overdueTasks = openTasks.filter(task => isTaskOverdue(task));
    const alerts = hives.filter(hive => hive.strength <= 4 || normalizeFamilyStatus(hive) === 'queen_replacement' || normalizeFamilyStatus(hive) === 'queenless').length;
    const avgStrength = average(hives.map(hive => hive.strength));
    const avgQueenAge = average(hives.map(hive => monthsSince(hive.queen.introducedAt)));
    const grade = alerts === 0 && overdueTasks.length === 0 && avgStrength >= 7 ? 'A' : alerts <= 1 && overdueTasks.length <= 2 ? 'B' : alerts <= 3 ? 'C' : 'D';

    return {
      apiary,
      hiveCount: hives.length,
      averageStrength: avgStrength,
      averageQueenAgeMonths: avgQueenAge,
      openTasks: openTasks.length,
      overdueTasks: overdueTasks.length,
      alerts,
      lastInspectionAt: dateMax(state.inspections.filter(item => hives.some(hive => hive.id === item.hiveId)).map(item => item.date)),
      lastFeedingAt: dateMax(state.feedings.filter(item => hives.some(hive => hive.id === item.hiveId)).map(item => item.date)),
      grade
    };
  });
}

export function buildWeakFamiliesReport(state: ApiaryState): WeakFamilyReportItem[] {
  return state.hives.map(hive => {
    const status = normalizeFamilyStatus(hive);
    const reasons: string[] = [];
    if (hive.strength <= 4) reasons.push('niska siła rodziny');
    if (hive.foodLevel === 'niski') reasons.push('niski pokarm');
    if (status === 'queenless' || status === 'suspected_queenless') reasons.push('problem z matką');
    if (hive.frameCount <= 5) reasons.push('mało ramek');
    const lastInspectionMonths = monthsSince(hive.lastInspectionAt);
    if (lastInspectionMonths >= 1) reasons.push('dawno bez przeglądu');

    return {
      hive,
      apiaryName: state.apiaries.find(apiary => apiary.id === hive.apiaryId)?.name ?? 'Pasieka',
      reasons,
      urgency: reasons.length + (hive.strength <= 3 ? 2 : 0)
    };
  }).filter(item => item.reasons.length > 0).sort((a, b) => b.urgency - a.urgency);
}

export function buildQueenReplacementNeedsReport(state: ApiaryState): QueenReplacementNeedItem[] {
  return state.hives.map(hive => {
    const age = monthsSince(hive.queen.introducedAt);
    const reasons: string[] = [];
    const status = normalizeFamilyStatus(hive);

    if (age >= 24) reasons.push('matka ponad 2 lata');
    if (hive.queen.status === 'to_replace' || hive.queen.acceptanceStatus === 'to_replace') reasons.push('status: do wymiany');
    if (status === 'queen_replacement') reasons.push('rodzina oznaczona do wymiany matki');
    if (hive.queen.rating && hive.queen.rating.overall <= 4) reasons.push('niska ocena matki');
    if (hive.mood === 'nerwowa') reasons.push('nerwowa rodzina');

    return {
      hive,
      apiaryName: state.apiaries.find(apiary => apiary.id === hive.apiaryId)?.name ?? 'Pasieka',
      queenAgeMonths: age,
      reasons,
      urgency: reasons.length + (age >= 36 ? 2 : 0)
    };
  }).filter(item => item.reasons.length > 0).sort((a, b) => b.urgency - a.urgency);
}

export function buildWorkStats14(state: ApiaryState): WorkStats14 {
  const completed = state.tasks.filter(task => task.status === 'done');
  const open = getOpenTasks(state.tasks);
  const overdue = open.filter(task => isTaskOverdue(task));
  const byCategory = state.tasks.reduce<Record<string, number>>((acc, task) => {
    const key = task.workCategory ?? task.type;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  return {
    completedTasks: completed.length,
    openTasks: open.length,
    overdueTasks: overdue.length,
    automaticTasks: state.tasks.filter(task => task.source === 'automatic').length,
    byCategory
  };
}

export function buildFeedingStats14(state: ApiaryState): FeedingStats14 {
  const totalAmount = Math.round(state.feedings.reduce((sum, feeding) => sum + feeding.amountLiters, 0) * 10) / 10;
  return {
    totalFeedings: state.feedings.length,
    totalAmount,
    averagePerHive: state.hives.length ? Math.round((totalAmount / state.hives.length) * 10) / 10 : 0,
    lastFeedingAt: dateMax(state.feedings.map(item => item.date))
  };
}

export function buildInspectionStats14(state: ApiaryState): InspectionStats14 {
  const dates = state.inspections.map(item => item.date).sort();
  const gaps = dates.slice(1).map((date, index) => Math.round((new Date(`${date}T12:00:00`).getTime() - new Date(`${dates[index]}T12:00:00`).getTime()) / 86400000));
  return {
    totalInspections: state.inspections.length,
    averageGapDays: average(gaps),
    lastInspectionAt: dateMax(dates)
  };
}

export function buildReportCharts14(state: ApiaryState) {
  const workStats = buildWorkStats14(state);
  const feedingStats = buildFeedingStats14(state);
  const inspectionStats = buildInspectionStats14(state);

  return {
    workByCategory: Object.entries(workStats.byCategory).map(([category, count]) => ({ label: category, value: count })),
    activity: [
      { label: 'Przeglądy', value: inspectionStats.totalInspections },
      { label: 'Karmienia', value: feedingStats.totalFeedings },
      { label: 'Zadania wykonane', value: workStats.completedTasks },
      { label: 'Zadania otwarte', value: workStats.openTasks }
    ]
  };
}
