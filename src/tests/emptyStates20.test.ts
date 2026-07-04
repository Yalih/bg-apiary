import { describe, expect, it } from 'vitest';
import { RC_EMPTY_STATES } from '../logic/designSystem20';

describe('empty states 2.0 RC', () => {
  it('avoids generic empty messages', () => {
    Object.values(RC_EMPTY_STATES).forEach(message => {
      expect(message).not.toBe('Brak danych');
      expect(message.length).toBeGreaterThan(30);
    });
  });
});
