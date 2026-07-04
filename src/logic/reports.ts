import type { ApiaryState, Hive } from '../models/apiary';
import { getGlobalStats, getHiveStats } from './statistics';

export function buildHiveReport(state: ApiaryState, hive: Hive): string {
  const stats = getHiveStats(state, hive);
  return [
    `Raport ula: ${hive.name}`,
    `Typ: ${hive.type}`,
    `Matka: ${hive.queen.breed} · ${hive.queen.line} · ${hive.queen.year}`,
    `Przeglądy: ${stats.inspections}`,
    `Karmienia: ${stats.feedings}`,
    `Notatki: ${stats.notes}`,
    `Zdjęcia: ${stats.photos}`,
    `Otwarte zadania: ${stats.openTasks}`,
    `Średnia siła: ${stats.averageStrength}`,
    `Podany pokarm: ${stats.totalFood}`,
    `Mateczniki w historii: ${stats.queenCellsTotal}`,
    `Ostatni przegląd: ${stats.lastInspection ?? 'brak'}`,
    `Ostatnie karmienie: ${stats.lastFeeding ?? 'brak'}`
  ].join('\n');
}

export function buildApiaryReport(state: ApiaryState, apiaryId: string): string {
  const apiary = state.apiaries.find(item => item.id === apiaryId);
  const hives = state.hives.filter(hive => hive.apiaryId === apiaryId);
  return [
    `Raport pasieki: ${apiary?.name ?? 'Nieznana pasieka'}`,
    `Lokalizacja: ${apiary?.location ?? 'brak'}`,
    `Liczba uli: ${hives.length}`,
    `Otwarte zadania: ${state.tasks.filter(task => task.apiaryId === apiaryId && task.status === 'open').length}`,
    `Przeglądy: ${state.inspections.filter(item => hives.some(hive => hive.id === item.hiveId)).length}`,
    `Karmienia: ${state.feedings.filter(item => hives.some(hive => hive.id === item.hiveId)).length}`
  ].join('\n');
}

export function buildGlobalReport(state: ApiaryState): string {
  const stats = getGlobalStats(state);
  return [
    'Raport BgApiary',
    `Pasieki: ${stats.apiaries}`,
    `Ule: ${stats.hives}`,
    `Przeglądy: ${stats.inspections}`,
    `Karmienia: ${stats.feedings}`,
    `Notatki: ${stats.notes}`,
    `Zdjęcia: ${stats.photos}`,
    `Otwarte zadania: ${stats.openTasks}`,
    `Zaległe zadania: ${stats.overdueTasks}`
  ].join('\n');
}
