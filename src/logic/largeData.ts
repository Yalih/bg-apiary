import type { ApiaryState, Hive, Task, Inspection, Feeding, HiveEvent, HiveNote } from '../models/apiary';
import { getQueenColor } from './queenColor';

function dateFromDay(day: number): string {
  const date = new Date('2026-01-01T12:00:00');
  date.setDate(date.getDate() + day);
  return date.toISOString().slice(0, 10);
}

export function generateLargeTestState(apiaryCount = 20, hivesPerApiary = 15): ApiaryState {
  const apiaries = Array.from({ length: apiaryCount }, (_, index) => ({
    id: `large-apiary-${index + 1}`,
    name: `Pasieka testowa ${index + 1}`,
    location: `Lokalizacja ${index + 1}`,
    description: 'Dane testowe wydajności 1.5',
    imageEmoji: '🐝'
  }));

  const hives: Hive[] = [];
  const inspections: Inspection[] = [];
  const feedings: Feeding[] = [];
  const tasks: Task[] = [];
  const events: HiveEvent[] = [];
  const notes: HiveNote[] = [];

  apiaries.forEach((apiary, apiaryIndex) => {
    for (let h = 1; h <= hivesPerApiary; h++) {
      const global = apiaryIndex * hivesPerApiary + h;
      const year = 2021 + (global % 6);
      getQueenColor(year);
      const hive: Hive = {
        id: `large-hive-${global}`,
        apiaryId: apiary.id,
        number: h,
        name: `Ul ${global}`,
        type: global % 2 === 0 ? 'Dadant 10R' : 'Warszawski poszerzany',
        frameCount: 6 + (global % 6),
        strength: 3 + (global % 8),
        mood: global % 7 === 0 ? 'nerwowa' : global % 3 === 0 ? 'normalna' : 'spokojna',
        foodLevel: global % 5 === 0 ? 'niski' : global % 2 === 0 ? 'średni' : 'dobry',
        queen: {
          introducedAt: dateFromDay(global % 160),
          breed: global % 3 === 0 ? 'Buckfast' : global % 3 === 1 ? 'Krainka' : 'Kaukaska',
          line: global % 3 === 0 ? 'B54' : global % 3 === 1 ? 'Sklenar' : 'Prima',
          year,
          status: global % 11 === 0 ? 'to_replace' : 'mated',
          origin: 'dane testowe',
          marked: true,
          clippedWing: false
        },
        familyStatus: global % 13 === 0 ? 'queen_replacement' : global % 8 === 0 ? 'weak' : global % 5 === 0 ? 'production' : 'development',
        mapPosition: { row: Math.floor((h - 1) / 4) + 1, column: ((h - 1) % 4) + 1 },
        queenHistory: [],
        lastInspectionAt: dateFromDay(100 + (global % 80)),
        nextAction: global % 4 === 0 ? 'Karmienie' : 'Przegląd',
        notes: 'Automatyczne dane testowe'
      };
      hives.push(hive);

      for (let i = 0; i < 10; i++) {
        inspections.push({
          id: `large-inspection-${global}-${i}`,
          hiveId: hive.id,
          date: dateFromDay(i * 12 + (global % 8)),
          summary: 'Przegląd testowy',
          brood: 'czerw obecny',
          queenSeen: i % 2 === 0,
          eggs: true,
          larvae: true,
          cappedBrood: true,
          cells: i % 3,
          strength: hive.strength,
          mood: hive.mood,
          foodLevel: hive.foodLevel,
          frameCount: hive.frameCount
        });
      }

      for (let f = 0; f < 7; f++) {
        feedings.push({
          id: `large-feeding-${global}-${f}`,
          hiveId: hive.id,
          date: dateFromDay(f * 15 + (global % 6)),
          type: 'syrop 1:1',
          amountLiters: 1 + (global % 3),
          unit: 'l',
          reason: 'test',
          note: ''
        });
      }

      for (let t = 0; t < 6; t++) {
        tasks.push({
          id: `large-task-${global}-${t}`,
          hiveId: hive.id,
          apiaryId: apiary.id,
          title: t % 2 === 0 ? 'Przegląd' : 'Karmienie',
          dueDate: dateFromDay(180 + (t % 20)),
          priority: t % 5 === 0 ? 'high' : 'medium',
          status: t % 4 === 0 ? 'done' : 'open',
          type: t % 2 === 0 ? 'inspection' : 'feeding',
          workCategory: t % 2 === 0 ? 'inspection' : 'feeding',
          description: 'Zadanie testowe',
          createdAt: dateFromDay(150),
          completedAt: t % 4 === 0 ? dateFromDay(181) : undefined,
          targetAction: t % 2 === 0 ? 'inspection' : 'feeding',
          source: 'manual'
        });
      }

      notes.push({ id: `large-note-${global}`, hiveId: hive.id, date: dateFromDay(global % 200), text: 'Notatka testowa' });
      events.push({ id: `large-event-${global}`, hiveId: hive.id, date: dateFromDay(global % 200), type: 'note', title: 'Zdarzenie testowe', details: 'Dane testowe' });
    }
  });

  return {
    apiaries,
    hives,
    inspections,
    feedings,
    events,
    decisionEvents: [],
    queenControls: [],
    workTours: [],
    workPreferences: {},
    notes,
    photos: [],
    tasks,
    lastOpenedHiveId: hives[0]?.id
  };
}

export function measureOperation<T>(operation: () => T): { result: T; durationMs: number } {
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const result = operation();
  const end = typeof performance !== 'undefined' ? performance.now() : Date.now();
  return { result, durationMs: Math.round((end - start) * 100) / 100 };
}
