export interface CustomDataViewerColumn<T> {
  name: string;
  value: (record: T) => string | number;
}
