import { apiRequest } from './apiClient';

export async function taskEndpointNotImplemented(): Promise<unknown> {
  return apiRequest('/tasks');
}
