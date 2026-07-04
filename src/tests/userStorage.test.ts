import { beforeEach, describe, expect, it, vi } from 'vitest';
import { registerUser } from '../auth/auth';
import { loadStateForUser, saveStateForUser } from '../storage/localStore';
import { demoState } from '../data/demoData';

const store = new Map<string, string>();

beforeEach(() => {
  store.clear();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
    clear: () => store.clear()
  });
});

describe('user separated localStorage', () => {
  it('stores app state separately for users', () => {
    const userA = registerUser({ name: 'A', email: 'a@test.pl', password: '1234', repeatPassword: '1234' }).user!;
    const userB = registerUser({ name: 'B', email: 'b@test.pl', password: '1234', repeatPassword: '1234' }).user!;

    saveStateForUser(userA.id, { ...demoState, apiaries: [{ ...demoState.apiaries[0], id: 'apiary-a', name: 'Pasieka A' }] });
    saveStateForUser(userB.id, { ...demoState, apiaries: [{ ...demoState.apiaries[0], id: 'apiary-b', name: 'Pasieka B' }] });

    expect(loadStateForUser(userA.id).apiaries[0].name).toBe('Pasieka A');
    expect(loadStateForUser(userB.id).apiaries[0].name).toBe('Pasieka B');
  });

  it('new user receives empty state', () => {
    const user = registerUser({ name: 'Nowy', email: 'nowy@test.pl', password: '1234', repeatPassword: '1234' }).user!;

    expect(loadStateForUser(user.id).hives.length).toBe(0);
    expect(loadStateForUser(user.id).apiaries.length).toBe(0);
  });
});
