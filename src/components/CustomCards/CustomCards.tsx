import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Grid,
  Text,
} from "grommet";
import React from "react";
import { CustomTableActionType } from "../../enum";
import { CustomTableActionTypeNames } from "../../consts";
import {
  CustomDataViewerAction,
  CustomDataViewerColumn,
} from "../../models";

interface CustomCardsProps<T> {
  data: T[];
  dataKey: (record: T) => React.Key;
  columns: CustomDataViewerColumn<T>[];
  actions?: CustomDataViewerAction<T>[];
}

export function CustomCards<T>({
  data,
  dataKey,
  actions,
  columns,
}: CustomCardsProps<T>) {
  return (
    <Grid align="start" columns={["auto", "auto", "auto", "auto"]} gap="small">
      {data.map((record) => (
        <Box key={dataKey(record)} pad="medium" gap="medium" width="medium">
          <Card pad="medium" gap="medium">
            <CardBody gap="small">
              {columns.map((column) => (
                <Text
                  key={`${dataKey(record)}:${column.name}`}
                >{`${column.name}: ${column.value(record)}`}</Text>
              ))}
            </CardBody>
            {actions?.length && (
              <CardFooter>
                <Box gap="small">
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
              </CardFooter>
            )}
          </Card>
        </Box>
      ))}
    </Grid>
  );
}
