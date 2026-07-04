import { describe, expect, it } from 'vitest';
import { createHoneyCustomer, createHoneyLabel } from '../logic/honey';

describe('honey customers and labels 1.7', () => {
  it('creates customer and label', () => {
    const customer = createHoneyCustomer({ firstName: 'Jan', lastName: 'Kowalski', phone: '123', email: '', notes: '' });
    const label = createHoneyLabel({ batchId: 'b1', labelName: 'Lipa 2026', netWeightGrams: 500, qrText: 'BG-2026-001', pouredAt: '2026-07-01' });

    expect(customer.id).toContain('honey-customer');
    expect(label.qrText).toBe('BG-2026-001');
  });
});
