import type { ApiaryState, InventoryItem } from '../models/apiary';
import { getInventoryStatus } from './inventory';

export function buildInventoryAlerts(state: ApiaryState): InventoryItem[] {
  return (state.inventoryItems ?? []).filter(item => getInventoryStatus(item) !== 'ok');
}

export function rememberLastChoice(storage: Record<string, string>, key: string, value: string) {
  return { ...storage, [key]: value };
}

export function autoPickSingle<T extends { id: string }>(items: T[]): string {
  return items.length === 1 ? items[0].id : '';
}

export function isTouchTargetLargeEnough(px: number): boolean {
  return px >= 44;
}

export function skeletonRows(count: number): number[] {
  return Array.from({ length: count }, (_, index) => index + 1);
}
