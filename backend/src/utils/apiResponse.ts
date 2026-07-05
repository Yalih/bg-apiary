import type { ApiResponse, Pagination } from '../models/api.js';

export function ok<T>(data: T, meta?: ApiResponse<T>['meta']): ApiResponse<T> {
  return { data, ...(meta ? { meta } : {}) };
}

export function paginated<T>(data: T[], pagination: Pagination): ApiResponse<T[]> {
  return { data, meta: { pagination } };
}
