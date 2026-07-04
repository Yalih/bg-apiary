import { describe, expect, it } from 'vitest';
import { demoState } from '../data/demoData';
import { buildInventoryReport, buildShoppingList, createInventoryItem, getInventoryAlerts } from '../logic/inventory';

describe('inventory reports 1.6', () => {
  it('builds inventory report and shopping list', () => {
    const low = createInventoryItem({ category: 'frames', name: 'Ramki WP', description: '', quantity: 2, unit: 'pcs', minQuantity: 10, optimalQuantity: 50, location: '' });
    const ok = createInventoryItem({ category: 'equipment', name: 'Podkurzacz', description: '', quantity: 1, unit: 'pcs', minQuantity: 1, optimalQuantity: 1, location: '' });
    const state = { ...demoState, inventoryItems: [low, ok], inventoryMovements: [] };

    const report = buildInventoryReport(state);
    const shopping = buildShoppingList(state.inventoryItems);
    const alerts = getInventoryAlerts(state.inventoryItems);

    expect(report.totalItems).toBe(2);
    expect(report.alerts).toBeGreaterThan(0);
    expect(shopping[0].neededQuantity).toBeGreaterThan(0);
    expect(alerts.length).toBeGreaterThan(0);
  });
});
