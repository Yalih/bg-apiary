import type { PageQuery, Pagination } from '../models/api.js';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 25;
const MAX_PAGE_SIZE = 100;

export function normalizePagination(query: PageQuery): Required<PageQuery> {
  const page = Math.max(Number(query.page ?? DEFAULT_PAGE), 1);
  const requestedPageSize = Math.max(Number(query.pageSize ?? DEFAULT_PAGE_SIZE), 1);
  const pageSize = Math.min(requestedPageSize, MAX_PAGE_SIZE);
  return { page, pageSize };
}

export function buildPagination(page: number, pageSize: number, total: number): Pagination {
  return { page, pageSize, total, totalPages: Math.max(Math.ceil(total / pageSize), 1) };
}
