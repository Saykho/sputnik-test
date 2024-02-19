import { CustomTablePagination } from "../../models";

export function usePagination<T>(
  data: T[],
  pagination?: CustomTablePagination,
) {
  if (!pagination) {
    return data;
  }

  const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
  return data.slice(startIndex, pagination.currentPage * pagination.pageSize);
}
