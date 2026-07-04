import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getCurrentUser, getSessionUserId, getUsers, loginUser, logoutUser, registerUser, validateRegister } from '../auth/auth';

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

describe('local test auth', () => {
  it('registers user and starts session', () => {
    const result = registerUser({ name: 'Paweł', email: 'pawel@test.pl', password: '1234', repeatPassword: '1234' });

    expect(result.errors).toEqual([]);
    expect(result.user?.email).toBe('pawel@test.pl');
    expect(getUsers()).toHaveLength(1);
    expect(getSessionUserId()).toBe(result.user?.id);
    expect(getCurrentUser()?.id).toBe(result.user?.id);
  });

  it('requires unique email', () => {
    registerUser({ name: 'Paweł', email: 'pawel@test.pl', password: '1234', repeatPassword: '1234' });
    const errors = validateRegister({ name: 'Drugi', email: 'pawel@test.pl', password: '1234', repeatPassword: '1234' });

    expect(errors).toContain('Konto z tym emailem już istnieje.');
  });

  it('rejects invalid login and accepts valid login', () => {
    const registered = registerUser({ name: 'Paweł', email: 'pawel@test.pl', password: '1234', repeatPassword: '1234' });
    logoutUser();

    const badLogin = loginUser({ email: 'pawel@test.pl', password: 'zle' });
    expect(badLogin.errors).toContain('Nieprawidłowy email lub hasło.');

    const goodLogin = loginUser({ email: 'pawel@test.pl', password: '1234' });
    expect(goodLogin.errors).toEqual([]);
    expect(getSessionUserId()).toBe(registered.user?.id);
  });

  it('logs out', () => {
    registerUser({ name: 'Paweł', email: 'pawel@test.pl', password: '1234', repeatPassword: '1234' });
    logoutUser();

    expect(getSessionUserId()).toBeNull();
    expect(getCurrentUser()).toBeNull();
  });
});
