import type { ApiaryState, Hive } from '../models/apiary';

export interface SeasonSummary {
  year: number;
  inspections: number;
  feedings: number;
  totalFood: number;
  completedTasks: number;
  photos: number;
  strongestHive?: Hive;
  mostProblematicHive?: Hive;
  mostFedHive?: Hive;
  mostQueenCellsHive?: Hive;
  bestQueenLine?: string;
}

export function buildSeasonSummary(state: ApiaryState, year = new Date().getFullYear()): SeasonSummary {
  const inYear = (date: string) => date.startsWith(String(year));
  const inspections = state.inspections.filter(item => inYear(item.date));
  const feedings = state.feedings.filter(item => inYear(item.date));
  const completedTasks = state.tasks.filter(item => item.status === 'done' && (!item.completedAt || item.completedAt.startsWith(String(year))));
  const photos = state.photos.filter(item => inYear(item.date));

  return {
    year,
    inspections: inspections.length,
    feedings: feedings.length,
    totalFood: Number(feedings.reduce((sum, item) => sum + item.amountLiters, 0).toFixed(1)),
    completedTasks: completedTasks.length,
    photos: photos.length,
    strongestHive: findByScore(state.hives, hive => hive.strength),
    mostProblematicHive: findByScore(state.hives, hive => {
      const hiveInspections = inspections.filter(item => item.hiveId === hive.id);
      const cells = hiveInspections.reduce((sum, item) => sum + item.cells, 0);
      const tasks = state.tasks.filter(item => item.hiveId === hive.id && item.priority === 'urgent').length;
      return cells + tasks * 2 + (hive.foodLevel === 'niski' ? 2 : 0);
    }),
    mostFedHive: findByScore(state.hives, hive => feedings.filter(item => item.hiveId === hive.id).reduce((sum, item) => sum + item.amountLiters, 0)),
    mostQueenCellsHive: findByScore(state.hives, hive => inspections.filter(item => item.hiveId === hive.id).reduce((sum, item) => sum + item.cells, 0)),
    bestQueenLine: findBestQueenLine(state)
  };
}

function findByScore(hives: Hive[], score: (hive: Hive) => number): Hive | undefined {
  return [...hives].sort((a, b) => score(b) - score(a))[0];
}

function findBestQueenLine(state: ApiaryState): string | undefined {
  const scores = new Map<string, { total: number; count: number }>();
  for (const hive of state.hives) {
    const key = `${hive.queen.breed} · ${hive.queen.line}`;
    const current = scores.get(key) ?? { total: 0, count: 0 };
    current.total += hive.strength;
    current.count += 1;
    scores.set(key, current);
  }

  return [...scores.entries()]
    .sort((a, b) => (b[1].total / b[1].count) - (a[1].total / a[1].count))[0]?.[0];
}
