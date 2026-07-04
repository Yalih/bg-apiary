import type { Hive, Task } from '../models/apiary';
import { getHiveCondition } from './hiveStatus';
import { getHiveMapPosition } from './apiaryMap';

export const APIARY_MAP_PREMIUM_VERSION = '2.1-apiary-map-polish';

export type ApiaryMapStatus21 = 'ok' | 'uwaga' | 'alarm' | 'brak-pozycji';

export function getApiaryMapStatus21(hive: Hive, tasks: Task[]): ApiaryMapStatus21 {
  const condition = getHiveCondition(hive, tasks);
  if (condition === 'urgent') return 'alarm';
  if (condition === 'attention') return 'uwaga';
  return 'ok';
}

export function hasMapPosition21(hive: Hive): boolean {
  const anyHive = hive as any;
  const pos = anyHive.mapPosition;
  if (!pos) return false;
  const row = Number(pos.row);
  const column = Number(pos.column);
  return Number.isFinite(row) && Number.isFinite(column) && row > 0 && column > 0;
}

export function splitHivesByMapPosition21(hives: Hive[]) {
  return {
    positioned: hives.filter(hasMapPosition21),
    unpositioned: hives.filter(hive => !hasMapPosition21(hive))
  };
}

export function buildApiaryMapStats21(hives: Hive[], tasks: Task[]) {
  const stats = { ok: 0, uwaga: 0, alarm: 0, brakPozycji: 0 };
  hives.forEach(hive => {
    if (!hasMapPosition21(hive)) {
      stats.brakPozycji += 1;
      return;
    }
    const status = getApiaryMapStatus21(hive, tasks);
    if (status === 'alarm') stats.alarm += 1;
    else if (status === 'uwaga') stats.uwaga += 1;
    else stats.ok += 1;
  });
  return stats;
}

export function getApiaryMapAttentionMessage21(hives: Hive[], tasks: Task[]): string {
  const stats = buildApiaryMapStats21(hives, tasks);
  const count = stats.alarm + stats.uwaga;
  if (count === 0) return 'Wszystkie ule wyglądają spokojnie';
  if (count === 1) return '1 ul wymaga uwagi';
  return `${count} ule wymagają uwagi`;
}

export function getShortInspectionLabel21(hive: Hive): string {
  const anyHive = hive as any;
  const lastInspection = anyHive.lastInspectionDate ?? anyHive.lastInspection ?? anyHive.inspectionDate;
  if (typeof lastInspection === 'string' && lastInspection.trim()) return `Przegląd: ${lastInspection}`;
  return 'Przegląd: zaplanuj';
}

export function buildPremiumApiaryRows21(hives: Hive[]) {
  const byRow = new Map<number, Hive[]>();
  hives.filter(hasMapPosition21).forEach(hive => {
    const pos = getHiveMapPosition(hive);
    const row = pos.row;
    byRow.set(row, [...(byRow.get(row) ?? []), hive]);
  });
  return [...byRow.entries()]
    .sort(([a], [b]) => a - b)
    .map(([row, rowHives]) => ({
      row,
      hives: rowHives.sort((a, b) => getHiveMapPosition(a).column - getHiveMapPosition(b).column)
    }));
}

export const apiaryMapMobileRules21 = {
  minTilePx: 88,
  scrollOnlyMapArea: true,
  fullPageHorizontalScroll: false
} as const;

export const apiaryMapNoModelChanges21 = {
  usesExistingMapPosition: true,
  addsNewFields: false,
  changesBackup: false,
  changesHiveLogic: false
} as const;
