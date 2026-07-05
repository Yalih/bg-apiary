import type { ResourceName, User } from './types';
import { queueOfflineMutation } from './offline';

const API_BASE = (import.meta.env.VITE_API_BASE || '/api/v1').replace(/\/$/, '');
const TOKEN_KEY = 'bg_apiary_token';

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.removeItem(TOKEN_KEY);
}

function humanApiError(status: number, body: unknown) {
  const message = typeof body === 'object' && body && 'message' in body
    ? String((body as { message?: unknown }).message)
    : '';

  if (status === 405) {
    return 'HTTP 405: Nginx nie przekazuje POST do API. Uruchom scripts/install-nginx-host.sh i sprawdź /api proxy.';
  }

  if (status === 404 && !message) {
    return 'HTTP 404: endpoint API nie został znaleziony. Sprawdź konfigurację /api/v1.';
  }

  return message || `HTTP ${status}`;
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const requestOptions: RequestInit = {
    ...options,
    headers,
    credentials: 'same-origin',
  };

  try {
    const response = await fetch(`${API_BASE}${path}`, requestOptions);
    const contentType = response.headers.get('content-type') || '';
    const body = contentType.includes('application/json')
      ? await response.json().catch(() => ({}))
      : await response.text().catch(() => '');

    if (!response.ok) {
      throw new Error(humanApiError(response.status, body));
    }

    if (response.status === 204) return undefined as T;
    return body as T;
  } catch (error) {
    const method = (options.method || 'GET').toUpperCase();

    if (!navigator.onLine && ['POST', 'PATCH', 'DELETE'].includes(method)) {
      await queueOfflineMutation({
        path,
        method,
        body: options.body ? String(options.body) : undefined,
        createdAt: new Date().toISOString(),
      });
    }

    throw error;
  }
}

export async function register(payload: { name: string; email: string; password: string }) {
  return apiRequest<{ token: string; user: User }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function login(payload: { email: string; password: string }) {
  return apiRequest<{ token: string; user: User }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function me() {
  return apiRequest<{ user: User }>('/auth/me');
}

export async function list<T>(resource: ResourceName, query = '') {
  return apiRequest<T[]>(`/${resource}${query}`);
}

export async function create<T>(resource: ResourceName, payload: unknown) {
  return apiRequest<T>(`/${resource}`, { method: 'POST', body: JSON.stringify(payload) });
}

export async function update<T>(resource: ResourceName, id: string, payload: unknown) {
  return apiRequest<T>(`/${resource}/${id}`, { method: 'PATCH', body: JSON.stringify(payload) });
}

export async function remove(resource: ResourceName, id: string) {
  return apiRequest<{ ok: boolean }>(`/${resource}/${id}`, { method: 'DELETE' });
}
