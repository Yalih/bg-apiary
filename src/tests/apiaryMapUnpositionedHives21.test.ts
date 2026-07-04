import { describe, expect, it } from 'vitest';
import { splitHivesByMapPosition21 } from '../logic/apiaryMapPremium21';

describe('apiary map unpositioned hives 2.1', () => {
  it('splits hives by existing mapPosition', () => {
    const hives = [
      { id: 'h1', mapPosition: { row: 1, column: 1 } },
      { id: 'h2' }
    ] as any;
    const result = splitHivesByMapPosition21(hives);
    expect(result.positioned).toHaveLength(1);
    expect(result.unpositioned).toHaveLength(1);
  });
});
