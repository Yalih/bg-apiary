import type { ApiaryState, Hive } from '../models/apiary';
import { getOpenTasks, isTaskOverdue } from './tasks';

export interface GlobalStats {
  apiaries: number;
  hives: number;
  inspections: number;
  feedings: number;
  notes: number;
  photos: number;
  openTasks: number;
  overdueTasks: number;
}

export interface HiveStats {
  inspections: number;
  feedings: number;
  notes: number;
  photos: number;
  openTasks: number;
  averageStrength: number;
  totalFood: number;
  queenCellsTotal: number;
  lastInspection?: string;
  lastFeeding?: string;
}

export function getGlobalStats(state: ApiaryState): GlobalStats {
  const openTasks = getOpenTasks(state.tasks);
  return {
    apiaries: state.apiaries.length,
    hives: state.hives.length,
    inspections: state.inspections.length,
    feedings: state.feedings.length,
    notes: state.notes.length,
    photos: state.photos.length,
    openTasks: openTasks.length,
    overdueTasks: openTasks.filter(task => isTaskOverdue(task)).length
  };
}

export function getHiveStats(state: ApiaryState, hive: Hive): HiveStats {
  const inspections = state.inspections.filter(item => item.hiveId === hive.id);
  const feedings = state.feedings.filter(item => item.hiveId === hive.id);
  const notes = state.notes.filter(item => item.hiveId === hive.id);
  const photos = state.photos.filter(item => item.hiveId === hive.id);
  const openTasks = getOpenTasks(state.tasks).filter(item => item.hiveId === hive.id);
  const averageStrength = inspections.length
    ? inspections.reduce((sum, item) => sum + item.strength, 0) / inspections.length
    : hive.strength;

  return {
    inspections: inspections.length,
    feedings: feedings.length,
    notes: notes.length,
    photos: photos.length,
    openTasks: openTasks.length,
    averageStrength: Number(averageStrength.toFixed(1)),
    totalFood: Number(feedings.reduce((sum, item) => sum + item.amountLiters, 0).toFixed(1)),
    queenCellsTotal: inspections.reduce((sum, item) => sum + item.cells, 0),
    lastInspection: inspections.sort((a, b) => b.date.localeCompare(a.date))[0]?.date,
    lastFeeding: feedings.sort((a, b) => b.date.localeCompare(a.date))[0]?.date
  };
}

export function getMostActiveHive(state: ApiaryState): Hive | undefined {
  return state.hives
    .map(hive => ({
      hive,
      score:
        state.inspections.filter(item => item.hiveId === hive.id).length +
        state.feedings.filter(item => item.hiveId === hive.id).length +
        state.notes.filter(item => item.hiveId === hive.id).length +
        state.photos.filter(item => item.hiveId === hive.id).length
    }))
    .sort((a, b) => b.score - a.score)[0]?.hive;
}
