import { apiRequest } from './apiClient';

export async function authEndpointNotImplemented(): Promise<unknown> {
  return apiRequest('/auths');
}
