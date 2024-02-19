import { useState } from "react";

export function useFilter<T>(data: T[], filterValue: (record: T) => string) {
  const [filters, setFilters] = useState<string[]>([]);
  const filteredData = data.filter(
    (record) => !filters.length || filters.includes(filterValue(record)),
  );

  return {
    data: filteredData,
    setFilters,
  };
}
