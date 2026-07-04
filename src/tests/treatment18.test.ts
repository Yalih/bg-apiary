import { describe, expect, it } from 'vitest';
import { createTreatment, treatmentToInventoryMovement } from '../logic/health';

describe('treatment 1.8', () => {
  it('creates treatment and inventory movement', () => {
    const treatment = createTreatment({
      hiveId: 'h1',
      date: '2026-07-01',
      preparation: 'Apiwarol',
      producer: 'Biowet',
      activeSubstance: 'amitraza',
      dose: 1,
      unit: 'tabletka',
      quantity: 1,
      batchNumber: 'A1',
      reason: 'warroza',
      nextControlDate: '2026-07-15',
      status: 'w_trakcie',
      inventoryItemId: 'med1',
      notes: ''
    });
    const movement = treatmentToInventoryMovement(treatment);
    expect(treatment.id).toContain('treatment-');
    expect(movement?.type).toBe('out');
    expect(movement?.itemId).toBe('med1');
  });
});
