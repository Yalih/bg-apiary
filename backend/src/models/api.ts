export interface ApiResponse<T> {
  data: T;
  meta?: ApiMeta;
}

export interface ApiMeta {
  requestId?: string;
  pagination?: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiErrorBody {
  message: string;
  code?: string;
  statusCode: number;
  details?: unknown;
}

export interface PageQuery {
  page?: number;
  pageSize?: number;
}
