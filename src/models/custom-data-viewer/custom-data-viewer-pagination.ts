export interface CustomDataViewerPagination {
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}
