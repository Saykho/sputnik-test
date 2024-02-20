import React from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";
import { CustomDataViewerAction, CustomDataViewerColumn } from "../../models";
import { CustomTableActionTypeNames } from "../../consts";
import { CustomTableActionType } from "../../enum";
import styles from "./CustomTable.module.scss";

interface CustomTableProps<T> {
  columns: CustomDataViewerColumn<T>[];
  data: T[];
  dataKey: (record: T) => React.Key;
  actions?: CustomDataViewerAction<T>[];
}

export function CustomTable<T>({
  data,
  columns,
  dataKey,
  actions,
}: CustomTableProps<T>) {
  return (
    <Table className={styles.content__table}>
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
              <TableCell key={`${dataKey(record)}:${column.name}`} scope="row">
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
  );
}
