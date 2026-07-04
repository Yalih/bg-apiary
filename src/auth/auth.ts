export interface TestUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

const USERS_KEY = 'bgapiary_users';
const SESSION_KEY = 'bgapiary_session';

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function hashLocalPassword(password: string): string {
  // Lokalny tryb testowy. To nie jest produkcyjne haszowanie.
  return btoa(unescape(encodeURIComponent(`bgapiary-local:${password}`)));
}

export function getUsers(): TestUser[] {
  if (typeof localStorage === 'undefined') return [];
  const stored = localStorage.getItem(USERS_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveUsers(users: TestUser[]): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function validateRegister(input: RegisterInput, users = getUsers()): string[] {
  const errors: string[] = [];
  const email = normalizeEmail(input.email);

  if (!input.name.trim()) errors.push('Podaj imię.');
  if (!email) errors.push('Podaj email.');
  if (!input.password) errors.push('Podaj hasło.');
  if (input.password && input.password.length < 4) errors.push('Hasło musi mieć minimum 4 znaki.');
  if (input.password !== input.repeatPassword) errors.push('Hasła nie są takie same.');
  if (email && users.some(user => user.email === email)) errors.push('Konto z tym emailem już istnieje.');

  return errors;
}

export function validateLogin(input: LoginInput): string[] {
  const errors: string[] = [];
  if (!normalizeEmail(input.email)) errors.push('Podaj email.');
  if (!input.password) errors.push('Podaj hasło.');
  return errors;
}

export function registerUser(input: RegisterInput): { user?: TestUser; errors: string[] } {
  const users = getUsers();
  const errors = validateRegister(input, users);
  if (errors.length) return { errors };

  const user: TestUser = {
    id: `user-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: input.name.trim(),
    email: normalizeEmail(input.email),
    passwordHash: hashLocalPassword(input.password),
    createdAt: new Date().toISOString()
  };

  saveUsers([user, ...users]);
  setSession(user.id);
  return { user, errors: [] };
}

export function loginUser(input: LoginInput): { user?: TestUser; errors: string[] } {
  const errors = validateLogin(input);
  if (errors.length) return { errors };

  const email = normalizeEmail(input.email);
  const passwordHash = hashLocalPassword(input.password);
  const user = getUsers().find(item => item.email === email && item.passwordHash === passwordHash);

  if (!user) return { errors: ['Nieprawidłowy email lub hasło.'] };

  setSession(user.id);
  return { user, errors: [] };
}

export function setSession(userId: string): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(SESSION_KEY, userId);
}

export function getSessionUserId(): string | null {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(SESSION_KEY);
}

export function getCurrentUser(): TestUser | null {
  const userId = getSessionUserId();
  if (!userId) return null;
  return getUsers().find(user => user.id === userId) ?? null;
}

export function logoutUser(): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
}

export function getUserStateKey(userId: string): string {
  return `bgapiary_state_${userId}`;
}
