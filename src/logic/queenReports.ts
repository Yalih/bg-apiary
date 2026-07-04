import type { ApiaryState } from '../models/apiary';
import { buildQueenCatalog } from './queenCatalog';

export function buildQueenReplacementReport(state: ApiaryState) {
  const catalog = buildQueenCatalog(state);
  const replaced = catalog.filter(item => !item.current);
  const current = catalog.filter(item => item.current);
  const averageAge = current.length === 0 ? 0 : Math.round(current.reduce((sum, item) => sum + item.ageMonths, 0) / current.length);
  const byBreed = countBy(catalog.map(item => item.breed));
  const byLine = countBy(catalog.map(item => item.line));
  const byStatus = countBy(catalog.map(item => item.status));

  return {
    totalQueens: catalog.length,
    currentQueens: current.length,
    replacedQueens: replaced.length,
    averageCurrentAgeMonths: averageAge,
    byBreed,
    byLine,
    byStatus,
    acceptanceRate: current.length === 0 ? 0 : Math.round((current.filter(item => item.status === 'accepted' || item.status === 'mated').length / current.length) * 100)
  };
}

function countBy(values: string[]): Record<string, number> {
  return values.reduce<Record<string, number>>((acc, value) => {
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
}
