import { apiRequest } from './apiClient';

export async function queenEndpointNotImplemented(): Promise<unknown> {
  return apiRequest('/queens');
}
