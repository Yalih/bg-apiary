import { apiRequest } from './apiClient';

export async function treatmentEndpointNotImplemented(): Promise<unknown> {
  return apiRequest('/treatments');
}
