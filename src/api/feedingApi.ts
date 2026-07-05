import { apiRequest } from './apiClient';

export async function feedingEndpointNotImplemented(): Promise<unknown> {
  return apiRequest('/feedings');
}
