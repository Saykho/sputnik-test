import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";
import {
  CustomTableAction,
  CustomTableColumn,
  CustomTablePagination,
} from "../../models";
import { CustomTableActionTypeNames } from "../../consts";
import { CustomTableActionType } from "../../enum";
import { usePagination } from "./usePagination";

export interface CustomCardProps<T> {
  cardHeader: (record: T) => string;
}

interface CustomTableProps<T> {
  columns: CustomTableColumn<T>[];
  data: T[];
  dataKey: (record: T) => React.Key;
  actions?: CustomTableAction<T>[];
  pagination?: CustomTablePagination;
  isCardView?: boolean;
  card?: CustomCardProps<T>;
}

export function CustomTable<T>({
  data: sourceData,
  columns,
  dataKey,
  actions,
  pagination,
  isCardView,
  card,
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
                  <Box direction="row" align="end" gap="small">
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
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Grid align="start" columns={["auto", "auto", "auto"]} gap="medium">
        {isCardView &&
          data.map((record) => (
            <Box key={dataKey(record)} pad="large" gap="medium" width="medium">
              <Card pad="small" gap="medium">
                <CardHeader>{`${card?.cardHeader(record)} info`}</CardHeader>
                <CardBody gap="small">
                  {columns.map((column) => (
                    <Text
                      key={`${dataKey(record)}:${column.name}`}
                    >{`${column.name}: ${column.value(record)}`}</Text>
                  ))}
                </CardBody>
              </Card>
            </Box>
          ))}
      </Grid>

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
