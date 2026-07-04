import { describe, expect, it } from 'vitest';
import { acceptInvite, createSharedMember } from '../logic/permissions20';

describe('sharing 2.0', () => {
  it('creates and accepts apiary invite', () => {
    const invite = createSharedMember('a1', 'jarek@example.com', 'manager');
    const accepted = acceptInvite(invite);
    expect(invite.status).toBe('zaproszony');
    expect(accepted.status).toBe('aktywny');
    expect(accepted.role).toBe('manager');
  });
});
