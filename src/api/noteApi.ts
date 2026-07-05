import { apiRequest } from './apiClient';

export async function noteEndpointNotImplemented(): Promise<unknown> {
  return apiRequest('/notes');
}
