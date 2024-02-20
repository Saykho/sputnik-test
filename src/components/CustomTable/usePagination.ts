import { CustomDataViewerPagination } from "../../models";

export function usePagination<T>(
  data: T[],
  pagination?: CustomDataViewerPagination,
) {
  if (!pagination) {
    return data;
  }

  const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
  return data.slice(startIndex, pagination.currentPage * pagination.pageSize);
}
