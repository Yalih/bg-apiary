import type { Apiary, ApiaryState, Hive, Queen, QueenControl, QueenHistoryEntry, QueenRating, QueenStatus, Task } from '../models/apiary';
import { getQueenColor } from './queenColor';

export interface QueenCatalogItem {
  id: string;
  hiveId: string;
  apiaryId: string;
  hiveName: string;
  apiaryName: string;
  breed: string;
  line: string;
  year: number;
  colorLabel: string;
  colorClass: string;
  colorEmoji: string;
  status: QueenStatus;
  origin: string;
  breeder: string;
  introducedAt: string;
  replacedAt?: string;
  ageMonths: number;
  current: boolean;
  rating?: QueenRating;
  lastControlAt?: string;
}

export interface QueenCatalogFilters {
  query?: string;
  breed?: string;
  line?: string;
  color?: string;
  status?: QueenStatus | 'all';
  apiaryId?: string;
  minYear?: number;
  maxYear?: number;
}

export function getQueenKey(queen: Pick<Queen, 'breed' | 'line' | 'year' | 'introducedAt'>, hiveId: string): string {
  return `${hiveId}-${queen.breed}-${queen.line}-${queen.year}-${queen.introducedAt}`;
}

export function getQueenAgeMonths(introducedAt: string, now = new Date()): number {
  const introduced = new Date(`${introducedAt}T12:00:00`);
  const months = (now.getFullYear() - introduced.getFullYear()) * 12 + (now.getMonth() - introduced.getMonth());
  return Math.max(0, months);
}

function itemFromCurrentQueen(hive: Hive, apiary: Apiary | undefined, queenControls: QueenControl[]): QueenCatalogItem {
  const color = getQueenColor(hive.queen.year);
  const queenKey = getQueenKey(hive.queen, hive.id);
  const controls = queenControls.filter(control => control.hiveId === hive.id && control.queenKey === queenKey);
  const lastControl = controls.sort((a, b) => b.date.localeCompare(a.date))[0];

  return {
    id: queenKey,
    hiveId: hive.id,
    apiaryId: hive.apiaryId,
    hiveName: hive.name,
    apiaryName: apiary?.name ?? 'Pasieka',
    breed: hive.queen.breed,
    line: hive.queen.line,
    year: hive.queen.year,
    colorLabel: color.label,
    colorClass: color.cssClass,
    colorEmoji: color.emoji,
    status: hive.queen.acceptanceStatus ?? hive.queen.status ?? 'mated',
    origin: hive.queen.origin ?? 'brak danych',
    breeder: hive.queen.breeder ?? 'brak danych',
    introducedAt: hive.queen.introducedAt,
    ageMonths: getQueenAgeMonths(hive.queen.introducedAt),
    current: true,
    rating: hive.queen.rating,
    lastControlAt: hive.queen.lastControlAt ?? lastControl?.date
  };
}

function itemFromHistoryQueen(entry: QueenHistoryEntry, hive: Hive | undefined, apiary: Apiary | undefined): QueenCatalogItem {
  const color = getQueenColor(entry.year);
  return {
    id: entry.id,
    hiveId: entry.hiveId,
    apiaryId: hive?.apiaryId ?? '',
    hiveName: hive?.name ?? 'Ul',
    apiaryName: apiary?.name ?? 'Pasieka',
    breed: entry.breed,
    line: entry.line,
    year: entry.year,
    colorLabel: color.label,
    colorClass: color.cssClass,
    colorEmoji: color.emoji,
    status: entry.status,
    origin: entry.origin,
    breeder: 'brak danych',
    introducedAt: entry.introducedAt,
    replacedAt: entry.replacedAt,
    ageMonths: getQueenAgeMonths(entry.introducedAt, new Date(`${entry.replacedAt}T12:00:00`)),
    current: false
  };
}

export function buildQueenCatalog(state: ApiaryState): QueenCatalogItem[] {
  const controls = state.queenControls ?? [];
  const current = state.hives.map(hive => itemFromCurrentQueen(hive, state.apiaries.find(apiary => apiary.id === hive.apiaryId), controls));
  const history = state.hives.flatMap(hive => (hive.queenHistory ?? []).map(entry => itemFromHistoryQueen(entry, hive, state.apiaries.find(apiary => apiary.id === hive.apiaryId))));
  return [...current, ...history].sort((a, b) => Number(b.current) - Number(a.current) || b.introducedAt.localeCompare(a.introducedAt));
}

export function filterQueenCatalog(items: QueenCatalogItem[], filters: QueenCatalogFilters): QueenCatalogItem[] {
  return items.filter(item => {
    const q = filters.query?.trim().toLowerCase();
    if (q) {
      const haystack = [item.hiveName, item.apiaryName, item.breed, item.line, item.colorLabel, item.year, item.status, item.origin, item.breeder].join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    if (filters.breed && item.breed !== filters.breed) return false;
    if (filters.line && item.line !== filters.line) return false;
    if (filters.color && item.colorLabel !== filters.color) return false;
    if (filters.status && filters.status !== 'all' && item.status !== filters.status) return false;
    if (filters.apiaryId && item.apiaryId !== filters.apiaryId) return false;
    if (filters.minYear && item.year < filters.minYear) return false;
    if (filters.maxYear && item.year > filters.maxYear) return false;

    return true;
  });
}

export function buildQueenAcceptanceTasks(hive: Hive, introducedAt: string): Task[] {
  const base = new Date(`${introducedAt}T12:00:00`);
  const controls: Array<{ days: number; label: string; type: '3d' | '7d' | '14d' | '30d' }> = [
    { days: 3, label: 'Kontrola uwolnienia matki', type: '3d' },
    { days: 7, label: 'Kontrola przyjęcia matki', type: '7d' },
    { days: 14, label: 'Kontrola czerwienia matki', type: '14d' },
    { days: 30, label: 'Ocena pracy matki', type: '30d' }
  ];

  return controls.map(control => {
    const due = new Date(base);
    due.setDate(due.getDate() + control.days);
    return {
      id: `task-queen-control-${hive.id}-${control.type}-${introducedAt}`,
      hiveId: hive.id,
      apiaryId: hive.apiaryId,
      title: control.label,
      dueDate: due.toISOString().slice(0, 10),
      priority: control.days <= 7 ? 'high' : 'medium',
      status: 'open',
      type: 'queen',
      workCategory: 'queen',
      description: `Automatyczna kontrola matki po poddaniu: ${control.days} dni.`,
      createdAt: new Date().toISOString().slice(0, 10),
      targetAction: 'open_hive',
      reminderAt: `${due.toISOString().slice(0, 10)}T07:00`,
      source: 'automatic'
    };
  });
}

export function createQueenControl(hive: Hive, data: Omit<QueenControl, 'id' | 'hiveId' | 'queenKey'>): QueenControl {
  return {
    id: `queen-control-${Date.now()}`,
    hiveId: hive.id,
    queenKey: getQueenKey(hive.queen, hive.id),
    ...data
  };
}

export function queenStatusLabel(status: QueenStatus): string {
  return {
    mated: 'Unasienniona',
    unmated: 'Nieunasienniona',
    caged: 'W klateczce',
    released: 'Uwolniona',
    observation: 'Obserwacja',
    accepted: 'Przyjęta',
    rejected: 'Nieprzyjęta',
    queenless: 'Brak matki',
    suspected_lost: 'Podejrzenie utraty',
    to_check: 'Do kontroli',
    to_replace: 'Do wymiany',
    replaced: 'Wymieniona'
  }[status];
}
