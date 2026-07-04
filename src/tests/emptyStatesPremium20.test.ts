import { describe, expect, it } from 'vitest';
import { BGS_VISUAL_EMPTY_ACTIONS } from '../logic/bgsVisual20';

describe('Empty states premium 2.0', () => {
  it('uses action-based empty states', () => {
    expect(BGS_VISUAL_EMPTY_ACTIONS).toContain('Dodaj pierwszy ul');
    BGS_VISUAL_EMPTY_ACTIONS.forEach(action => expect(action).not.toContain('Brak danych'));
  });
});
