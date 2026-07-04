import { describe, expect, it } from 'vitest';
import { apiaryMapNoModelChanges21 } from '../logic/apiaryMapPremium21';

describe('apiary map no model changes 2.1', () => {
  it('does not require new model fields', () => {
    expect(apiaryMapNoModelChanges21.usesExistingMapPosition).toBe(true);
    expect(apiaryMapNoModelChanges21.addsNewFields).toBe(false);
    expect(apiaryMapNoModelChanges21.changesBackup).toBe(false);
    expect(apiaryMapNoModelChanges21.changesHiveLogic).toBe(false);
  });
});
