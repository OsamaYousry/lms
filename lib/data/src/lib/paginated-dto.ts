export interface PaginatedDTO<T> {
  page: number;
  pageSize: number;
  total: number;
  data: T[];
}
