export interface CustomTableColumn<T> {
  name: string;
  value: (record: T) => string | number;
}
