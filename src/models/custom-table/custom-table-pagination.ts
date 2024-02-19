export interface CustomTablePagination {
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}
