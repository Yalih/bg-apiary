import { apiRequest } from './apiClient';

export async function inspectionEndpointNotImplemented(): Promise<unknown> {
  return apiRequest('/inspections');
}
