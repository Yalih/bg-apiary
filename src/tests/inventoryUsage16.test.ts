import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { addInventoryMovement, applyInventoryMovement, createInventoryItem, createInventoryMovement, suggestUsageForFeeding, suggestUsageForTask } from '../logic/inventory';

describe('inventory usage 1.6', () => {
  it('applies movement to item quantity', () => {
    const item = createInventoryItem({ category: 'food', name: 'Syrop', description: '', quantity: 10, unit: 'l', minQuantity: 2, optimalQuantity: 20, location: '' });
    const movement = createInventoryMovement({ itemId: item.id, date: '2026-07-01', type: 'out', quantity: 3, reason: 'karmienie', note: '' });

    const updated = applyInventoryMovement([item], movement);
    expect(updated[0].quantity).toBe(7);
  });

  it('adds movement to state', () => {
    const item = createInventoryItem({ category: 'food', name: 'Syrop', description: '', quantity: 10, unit: 'l', minQuantity: 2, optimalQuantity: 20, location: '' });
    const movement = createInventoryMovement({ itemId: item.id, date: '2026-07-01', type: 'out', quantity: 1, reason: 'test', note: '' });
    const state = addInventoryMovement({ ...demoState, inventoryItems: [item], inventoryMovements: [] }, movement);

    expect(state.inventoryItems?.[0].quantity).toBe(9);
    expect(state.inventoryMovements).toHaveLength(1);
  });

  it('suggests usage for feeding and task', () => {
    const food = createInventoryItem({ category: 'food', name: 'Syrop', description: '', quantity: 10, unit: 'l', minQuantity: 2, optimalQuantity: 20, location: '' });
    const frame = createInventoryItem({ category: 'frames', name: 'Ramki', description: '', quantity: 10, unit: 'pcs', minQuantity: 2, optimalQuantity: 20, location: '' });
    const feeding = { ...demoState.feedings[0], unit: 'l' as const, amountLiters: 1 };
    const task = { ...demoState.tasks[0], type: 'inspection' as const };

    expect(suggestUsageForFeeding(feeding, [food])).toHaveLength(1);
    expect(suggestUsageForTask(task, demoState.hives[0], [frame])).toHaveLength(1);
  });
});
