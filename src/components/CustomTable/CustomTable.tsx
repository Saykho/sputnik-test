import React from "react";
import {
  Box,
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";
import {
  CustomTableAction,
  CustomTableColumn,
  CustomTablePagination,
} from "../../models";
import { CustomTableActionTypeNames } from "../../consts";
import { CustomTableActionType } from "../../enum";
import { usePagination } from "./usePagination";

interface CustomTableProps<T> {
  columns: CustomTableColumn<T>[];
  data: T[];
  dataKey: (record: T) => React.Key;
  actions?: CustomTableAction<T>[];
  pagination?: CustomTablePagination;
}

export function CustomTable<T>({
  data: sourceData,
  columns,
  dataKey,
  actions,
  pagination,
}: CustomTableProps<T>) {
  const data = usePagination(sourceData, pagination);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.name} scope="col" border="bottom">
                {column.name}
              </TableCell>
            ))}
            {actions?.length && <TableCell>Действия</TableCell>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record) => (
            <TableRow key={dataKey(record)}>
              {columns.map((column) => (
                <TableCell
                  key={`${dataKey(record)}:${column.name}`}
                  scope="row"
                >
                  {column.value(record)}
                </TableCell>
              ))}

              {actions?.length && (
                <TableCell>
                  {actions.map((action) => {
                    if (
                      action.type === CustomTableActionType.Custom &&
                      action.customRender
                    ) {
                      return (
                        <div
                          key={action.actionKey}
                          onClick={() => action.onClick(record)}
                        >
                          {action.customRender(record)}
                        </div>
                      );
                    }

                    return (
                      <Button
                        key={action.actionKey}
                        label={CustomTableActionTypeNames[action.type]}
                        onClick={() => action.onClick(record)}
                      />
                    );
                  })}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {pagination && (
        <Box
          direction="row-responsive"
          fill="horizontal"
          border="top"
          justify="end"
          pad={{ vertical: "xsmall" }}
        >
          <Pagination
            page={pagination.currentPage}
            onChange={(e) => pagination.onPageChange(e.page)}
            numberItems={sourceData.length}
          />
        </Box>
      )}
    </>
  );
}
