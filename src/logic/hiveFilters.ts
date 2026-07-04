import type { Apiary, FamilyStatus, Hive, Task } from '../models/apiary';
import { getHiveCondition } from './hiveStatus';
import { getQueenColor } from './queenColor';

export type HiveFilter =
  | 'all'
  | 'inspection'
  | 'feeding'
  | 'tasks'
  | 'risk'
  | 'queenless'
  | 'queen_replacement'
  | 'weak'
  | 'strong'
  | 'young_queen'
  | 'red_queen'
  | 'green_queen'
  | 'wp'
  | 'dadant';

export function familyStatusLabel(status?: FamilyStatus): string {
  return {
    development: 'Rozwój',
    production: 'Produkcja',
    strong: 'Silna',
    medium: 'Średnia',
    weak: 'Słaba',
    queenless: 'Bez matki',
    suspected_queenless: 'Podejrzenie bezmatka',
    queen_replacement: 'Do wymiany matki',
    swarm_risk: 'Podejrzenie rójki',
    after_swarm: 'Po rójce',
    combine: 'Do połączenia',
    sick: 'Podejrzenie choroby',
    robbery: 'Rabunek',
    wintering: 'Zimowla'
  }[status ?? 'medium'];
}

export function normalizeFamilyStatus(hive: Hive): FamilyStatus {
  if (hive.familyStatus) return hive.familyStatus;
  if (hive.strength >= 8) return 'strong';
  if (hive.strength <= 4) return 'weak';
  return 'medium';
}

export function searchHives(hives: Hive[], apiaries: Apiary[], query: string): Hive[] {
  const q = query.trim().toLowerCase();
  if (!q) return hives;

  return hives.filter(hive => {
    const apiary = apiaries.find(item => item.id === hive.apiaryId);
    const haystack = [
      hive.name,
      String(hive.number),
      hive.type,
      hive.queen.breed,
      hive.queen.line,
      hive.notes,
      familyStatusLabel(normalizeFamilyStatus(hive)),
      apiary?.name,
      apiary?.location
    ].join(' ').toLowerCase();

    return haystack.includes(q);
  });
}

export function filterHives(hives: Hive[], tasks: Task[], filter: HiveFilter): Hive[] {
  if (filter === 'all') return hives;
  return hives.filter(hive => {
    const hiveTasks = tasks.filter(task => task.hiveId === hive.id && task.status === 'open');
    const status = normalizeFamilyStatus(hive);
    const condition = getHiveCondition(hive, tasks);
    const queenColor = getQueenColor(hive.queen.year);

    if (filter === 'inspection') return hiveTasks.some(task => task.type === 'inspection');
    if (filter === 'feeding') return hiveTasks.some(task => task.type === 'feeding');
    if (filter === 'tasks') return hiveTasks.length > 0;
    if (filter === 'risk') return condition === 'urgent' || condition === 'attention';
    if (filter === 'queenless') return status === 'queenless' || status === 'suspected_queenless';
    if (filter === 'queen_replacement') return status === 'queen_replacement' || hive.queen.status === 'to_replace';
    if (filter === 'weak') return hive.strength <= 4 || status === 'weak';
    if (filter === 'strong') return hive.strength >= 8 || status === 'strong';
    if (filter === 'young_queen') return new Date().getFullYear() - hive.queen.year <= 1;
    if (filter === 'red_queen') return queenColor.cssClass === 'queen-red';
    if (filter === 'green_queen') return queenColor.cssClass === 'queen-green';
    if (filter === 'wp') return hive.type.toLowerCase().includes('warszawski') || hive.type.toLowerCase().includes('wp');
    if (filter === 'dadant') return hive.type.toLowerCase().includes('dadant');
    return true;
  });
}
