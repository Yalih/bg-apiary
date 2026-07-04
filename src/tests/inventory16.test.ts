import { describe, expect, it } from 'vitest';
import { createInventoryItem, getInventoryStatus, unitLabel, categoryLabel, seedStarterInventory } from '../logic/inventory';

describe('inventory 1.6', () => {
  it('creates inventory item and labels units', () => {
    const item = createInventoryItem({
      category: 'frames',
      name: 'Ramki WP',
      description: '',
      quantity: 20,
      unit: 'pcs',
      minQuantity: 10,
      optimalQuantity: 50,
      location: 'magazyn'
    });

    expect(item.id).toContain('inventory-');
    expect(unitLabel('pcs')).toBe('szt.');
    expect(categoryLabel('frames')).toBe('Ramki');
    expect(getInventoryStatus(item)).toBe('ok');
  });

  it('detects low and missing stock', () => {
    const low = createInventoryItem({ category: 'food', name: 'Cukier', description: '', quantity: 5, unit: 'kg', minQuantity: 10, optimalQuantity: 50, location: '' });
    const missing = { ...low, quantity: 0 };

    expect(getInventoryStatus(low)).toBe('low');
    expect(getInventoryStatus(missing)).toBe('missing');
  });

  it('creates starter inventory templates', () => {
    const starter = seedStarterInventory();
    expect(starter.length).toBeGreaterThan(0);
  });
});
