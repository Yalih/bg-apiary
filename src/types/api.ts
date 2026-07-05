export interface ApiEnvelope<T> {
  data: T;
  meta?: ApiMeta;
}

export interface ApiMeta {
  requestId?: string;
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
  statusCode?: number;
  details?: unknown;
}

export interface PageQuery {
  page?: number;
  pageSize?: number;
}

export interface ApiaryDto {
  id: string;
  name: string;
  description?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface HiveDto {
  id: string;
  apiaryId: string;
  name: string;
  type: string;
  status: string;
  strength?: number | null;
  frameCount?: number | null;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
