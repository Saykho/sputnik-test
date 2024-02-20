export interface CustomCardHeader<T> {
  cardHeader: (record: T) => string;
}
