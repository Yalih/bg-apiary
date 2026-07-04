import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { createBackup, restoreBackup } from '../logic/backup';
import { createInventoryItem, createInventoryMovement } from '../logic/inventory';

describe('inventory backup 1.6', () => {
  it('keeps inventory in backup', () => {
    const item = createInventoryItem({ category: 'medicine', name: 'Apiwarol', description: '', quantity: 2, unit: 'pack', minQuantity: 1, optimalQuantity: 4, location: '' });
    const movement = createInventoryMovement({ itemId: item.id, date: '2026-07-01', type: 'in', quantity: 2, reason: 'zakup', note: '' });
    const backup = createBackup({ ...demoState, inventoryItems: [item], inventoryMovements: [movement] });
    const restored = restoreBackup(backup);

    expect(backup.version).toBe('2.0 FINAL');
    expect(restored.inventoryItems).toHaveLength(1);
    expect(restored.inventoryMovements).toHaveLength(1);
  });
});
