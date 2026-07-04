import type { Apiary, ApiaryState, Hive } from '../models/apiary';
import { createEmptyState } from '../storage/emptyState';

export function generateLargeData20(hiveCount: number): ApiaryState {
  const apiaryCount = Math.max(1, Math.ceil(hiveCount / 50));
  const state = createEmptyState();
  const apiaries: Apiary[] = Array.from({ length: apiaryCount }, (_, index) => ({
    id: `large-apiary-${index + 1}`,
    name: `Pasieka testowa ${index + 1}`,
    location: `Lokalizacja ${index + 1}`,
    description: 'Dane testowe RC',
    imageEmoji: '🐝',
    notes: 'Dane testowe RC',
    createdAt: '2026-01-01'
  }));

  const hives: Hive[] = Array.from({ length: hiveCount }, (_, index) => {
    const apiary = apiaries[index % apiaries.length];
    return {
      id: `large-hive-${index + 1}`,
      apiaryId: apiary.id,
      name: `Ul ${index + 1}`,
      number: index + 1,
      type: 'Warszawski Poszerzany',
      frameCount: 6 + (index % 6),
      strength: 3 + (index % 7),
      mood: 'normalna',
      foodLevel: index % 5 === 0 ? 'niski' : 'dobry',
      lastInspectionAt: '2026-07-01',
      nextAction: 'Kontrola sezonowa',
      notes: 'Ul testowy RC',
      queen: {
        breed: 'Krainka',
        line: 'Sklenar G10',
        year: 2026,
        color: 'biały',
        status: index % 9 === 0 ? 'to_replace' : 'mated',
        introducedAt: '2026-06-01',
        origin: 'dane testowe'
      }
    };
  });

  return { ...state, apiaries, hives };
}

export const LARGE_DATA_PROFILES_20 = [10, 50, 100, 250, 500, 1000] as const;

export function measureRcPerformance(state: ApiaryState) {
  const start = performance.now();
  const hives = state.hives.length;
  const apiaries = state.apiaries.length;
  const tasks = state.tasks.length;
  const durationMs = Math.round((performance.now() - start) * 1000) / 1000;
  return { hives, apiaries, tasks, durationMs };
}
