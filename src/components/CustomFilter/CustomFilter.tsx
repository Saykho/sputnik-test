import React from "react";
import { Data, DataFilters, Toolbar } from "grommet";
import styles from "./CustomFilter.module.scss";

export interface CustomFilterProps<T> {
  data: T[];
  filterValue: (record: T) => string;
  filterName: string;
  onSubmit: (filterValues: string[]) => void;
}

export function CustomFilter<T>({
  data,
  filterValue,
  filterName,
  onSubmit,
}: CustomFilterProps<T>) {
  const filters = Array.from(new Set(data.map(filterValue))).map((filter) => ({
    name: filter,
  }));

  // <DataTable
  //   columns={[
  //     {
  //       property: "name",
  //     },
  //   ]}
  // />

  return (
    <div>
      {filterName}
      <Data data={filters} onSubmit={(e: any) => onSubmit(e.value.name ?? [])}>
        <Toolbar align="center">
          <DataFilters className={styles.customFilter} />
        </Toolbar>
      </Data>
    </div>
  );
}
