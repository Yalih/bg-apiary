import { apiRequest } from './apiClient';

export interface HealthResponse {
  service: string;
  status: 'ok' | 'degraded';
  database: 'connected' | 'disconnected';
  version: string;
  timestamp: string;
}

export function getHealth(): Promise<HealthResponse> {
  return apiRequest<HealthResponse>('/health');
}
