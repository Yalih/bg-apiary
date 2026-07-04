import type { ApiaryState, Feeding, Hive, InventoryCategory, InventoryItem, InventoryMovement, InventoryStatus, InventoryUnit, Task } from '../models/apiary';

export const INVENTORY_CATEGORIES: Array<{ value: InventoryCategory; label: string; icon: string }> = [
  { value: 'frames', label: 'Ramki', icon: '📐' },
  { value: 'boxes', label: 'Korpusy', icon: '🏠' },
  { value: 'food', label: 'Pokarm', icon: '🍯' },
  { value: 'medicine', label: 'Leki', icon: '💊' },
  { value: 'queens', label: 'Matki', icon: '👑' },
  { value: 'splits', label: 'Odkłady', icon: '🐝' },
  { value: 'equipment', label: 'Sprzęt', icon: '🛠️' }
];

export const INVENTORY_UNITS: InventoryUnit[] = ['pcs', 'kg', 'l', 'pack', 'set'];

export function unitLabel(unit: InventoryUnit): string {
  return { pcs: 'szt.', kg: 'kg', l: 'l', pack: 'op.', set: 'kpl.' }[unit];
}

export function categoryLabel(category: InventoryCategory): string {
  return INVENTORY_CATEGORIES.find(item => item.value === category)?.label ?? category;
}

export function categoryIcon(category: InventoryCategory): string {
  return INVENTORY_CATEGORIES.find(item => item.value === category)?.icon ?? '📦';
}

export function getInventoryStatus(item: InventoryItem): InventoryStatus {
  if (item.quantity <= 0) return 'missing';
  if (item.quantity <= item.minQuantity) return 'low';
  return 'ok';
}

export function inventoryStatusLabel(status: InventoryStatus): string {
  return { ok: 'OK', low: 'Mało', missing: 'Brakuje' }[status];
}

export function createInventoryItem(input: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>): InventoryItem {
  const now = new Date().toISOString();
  return {
    id: `inventory-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: now,
    updatedAt: now,
    ...input
  };
}

export function createInventoryMovement(input: Omit<InventoryMovement, 'id'>): InventoryMovement {
  return {
    id: `inventory-movement-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ...input
  };
}

export function applyInventoryMovement(items: InventoryItem[], movement: InventoryMovement): InventoryItem[] {
  return items.map(item => {
    if (item.id !== movement.itemId) return item;
    const delta = movement.type === 'in' ? movement.quantity : movement.type === 'out' || movement.type === 'reserved' ? -movement.quantity : movement.quantity;
    return {
      ...item,
      quantity: Math.max(0, Math.round((item.quantity + delta) * 100) / 100),
      updatedAt: new Date().toISOString()
    };
  });
}

export function addInventoryMovement(state: ApiaryState, movement: InventoryMovement): ApiaryState {
  return {
    ...state,
    inventoryItems: applyInventoryMovement(state.inventoryItems ?? [], movement),
    inventoryMovements: [movement, ...(state.inventoryMovements ?? [])]
  };
}

export function getInventoryAlerts(items: InventoryItem[]): InventoryItem[] {
  return items.filter(item => getInventoryStatus(item) !== 'ok');
}

export function buildShoppingList(items: InventoryItem[]) {
  return getInventoryAlerts(items).map(item => ({
    itemId: item.id,
    name: item.name,
    category: item.category,
    neededQuantity: Math.max(0, Math.round((item.optimalQuantity - item.quantity) * 100) / 100),
    unit: item.unit,
    status: getInventoryStatus(item)
  })).filter(item => item.neededQuantity > 0);
}

export function buildInventoryReport(state: ApiaryState) {
  const items = state.inventoryItems ?? [];
  const movements = state.inventoryMovements ?? [];
  const totalValue = Math.round(items.reduce((sum, item) => sum + (item.purchasePrice ?? 0) * item.quantity, 0) * 100) / 100;
  const byCategory = INVENTORY_CATEGORIES.map(category => {
    const categoryItems = items.filter(item => item.category === category.value);
    return {
      category: category.value,
      label: category.label,
      icon: category.icon,
      itemCount: categoryItems.length,
      quantity: Math.round(categoryItems.reduce((sum, item) => sum + item.quantity, 0) * 100) / 100,
      alerts: categoryItems.filter(item => getInventoryStatus(item) !== 'ok').length
    };
  });

  return {
    totalItems: items.length,
    totalMovements: movements.length,
    alerts: getInventoryAlerts(items).length,
    shoppingList: buildShoppingList(items),
    totalValue,
    byCategory
  };
}

export function suggestUsageForFeeding(feeding: Feeding, items: InventoryItem[]): InventoryMovement[] {
  const foodItem = items.find(item => item.category === 'food' && item.unit === feeding.unit && item.quantity >= feeding.amountLiters)
    ?? items.find(item => item.category === 'food' && item.unit === feeding.unit);

  if (!foodItem) return [];
  return [createInventoryMovement({
    itemId: foodItem.id,
    date: feeding.date,
    type: 'out',
    quantity: feeding.amountLiters,
    reason: `Karmienie: ${feeding.reason || feeding.type}`,
    hiveId: feeding.hiveId,
    note: 'Automatyczna propozycja zużycia pokarmu'
  })];
}

export function suggestUsageForTask(task: Task, hive: Hive | undefined, items: InventoryItem[]): InventoryMovement[] {
  if (task.type === 'feeding') {
    const food = items.find(item => item.category === 'food' && item.quantity > 0);
    return food ? [createInventoryMovement({
      itemId: food.id,
      date: task.completedAt?.slice(0, 10) ?? task.dueDate,
      type: 'out',
      quantity: 1,
      reason: `Zadanie: ${task.title}`,
      hiveId: task.hiveId,
      apiaryId: task.apiaryId,
      taskId: task.id,
      note: 'Propozycja zużycia pokarmu'
    })] : [];
  }

  if (task.type === 'queen') {
    const queen = items.find(item => item.category === 'queens' && item.quantity > 0);
    return queen ? [createInventoryMovement({
      itemId: queen.id,
      date: task.completedAt?.slice(0, 10) ?? task.dueDate,
      type: 'out',
      quantity: 1,
      reason: `Praca z matką: ${task.title}`,
      hiveId: task.hiveId,
      apiaryId: task.apiaryId,
      taskId: task.id,
      note: `Ul: ${hive?.name ?? task.hiveId}`
    })] : [];
  }

  if (task.type === 'expansion' || task.type === 'inspection') {
    const frame = items.find(item => item.category === 'frames' && item.quantity > 0);
    return frame ? [createInventoryMovement({
      itemId: frame.id,
      date: task.completedAt?.slice(0, 10) ?? task.dueDate,
      type: 'out',
      quantity: 1,
      reason: `Praca w ulu: ${task.title}`,
      hiveId: task.hiveId,
      apiaryId: task.apiaryId,
      taskId: task.id,
      note: 'Propozycja zużycia ramki'
    })] : [];
  }

  return [];
}

export function seedStarterInventory(): InventoryItem[] {
  const now = new Date().toISOString();
  return [
    { id: 'starter-frames-wp', category: 'frames', name: 'Ramki WP z węzą', description: 'Starter magazynu', quantity: 0, unit: 'pcs', minQuantity: 10, optimalQuantity: 50, location: '', createdAt: now, updatedAt: now },
    { id: 'starter-food-sugar', category: 'food', name: 'Cukier', description: 'Starter magazynu', quantity: 0, unit: 'kg', minQuantity: 25, optimalQuantity: 100, location: '', createdAt: now, updatedAt: now },
    { id: 'starter-medicine-varroa', category: 'medicine', name: 'Leki przeciw warrozie', description: 'Starter magazynu', quantity: 0, unit: 'pack', minQuantity: 1, optimalQuantity: 4, location: '', createdAt: now, updatedAt: now }
  ];
}
