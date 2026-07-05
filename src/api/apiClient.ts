import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

export type ApiEnvelope<T> = { data: T };

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:4000').replace(/\/$/, '');

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 12000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status ?? 0;
    const message = error.response?.data?.message ?? error.message ?? 'API request failed';
    return Promise.reject(new ApiError(message, status, error.response?.data));
  }
);

export async function apiRequest<T>(path: string, options: AxiosRequestConfig = {}): Promise<T> {
  const response = await apiClient.request<T>({ url: path, ...options });
  return response.data;
}

export function unwrapData<T>(envelope: ApiEnvelope<T>): T {
  return envelope.data;
}
