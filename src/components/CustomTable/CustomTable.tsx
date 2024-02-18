import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "grommet";

export interface CustomTableColumn<T> {
  name: string;
  value: (record: T) => string | number;
}

interface CustomTableProps<T> {
  columns: CustomTableColumn<T>[];
  data: T[];
  dataKey: (record: T) => React.Key;
}

export function CustomTable<T>({
  data,
  columns,
  dataKey,
}: CustomTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.name} scope="col" border="bottom">
              {column.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((record) => (
          <TableRow key={dataKey(record)}>
            {columns.map((column) => (
              <TableCell key={`${dataKey(record)}:${column.name}`} scope="row">
                {column.value(record)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
