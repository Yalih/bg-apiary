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

const demoUser: TestUser = {
  id: 'demo-backend-user',
  name: 'BG Apiary Tester',
  email: 'demo@bgapiary.pro',
  passwordHash: 'backend-session',
  createdAt: new Date().toISOString()
};

let currentUser: TestUser | null = demoUser;

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function hashLocalPassword(password: string): string {
  return `backend-ready:${password.length}`;
}

export function getUsers(): TestUser[] {
  return [demoUser];
}

export function saveUsers(_users: TestUser[]): void {
  // Sprint 3.5: użytkownicy nie są już zapisywani w localStorage.
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
  const errors = validateRegister(input, []);
  if (errors.length) return { errors };

  currentUser = {
    id: `session-${Date.now()}`,
    name: input.name.trim(),
    email: normalizeEmail(input.email),
    passwordHash: hashLocalPassword(input.password),
    createdAt: new Date().toISOString()
  };

  return { user: currentUser, errors: [] };
}

export function loginUser(input: LoginInput): { user?: TestUser; errors: string[] } {
  const errors = validateLogin(input);
  if (errors.length) return { errors };

  currentUser = {
    ...demoUser,
    email: normalizeEmail(input.email) || demoUser.email
  };

  return { user: currentUser, errors: [] };
}

export function setSession(userId: string): void {
  currentUser = { ...demoUser, id: userId };
}

export function getSessionUserId(): string | null {
  return currentUser?.id ?? null;
}

export function getCurrentUser(): TestUser | null {
  return currentUser;
}

export function logoutUser(): void {
  currentUser = null;
}

export function getUserStateKey(userId: string): string {
  return `deprecated_backend_state_${userId}`;
}
