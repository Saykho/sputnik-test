import React, { useEffect } from "react";
import { Box, Button, Pagination } from "grommet";
import {
  CustomDataViewerAction,
  CustomDataViewerColumn,
  CustomDataViewerPagination,
} from "../../models";
import { usePagination } from "../CustomTable/usePagination";
import { CustomCards } from "../CustomCards";
import { CustomTable } from "../CustomTable";
import { CustomTableActionType } from "../../enum";
import { CustomTableActionTypeNames } from "../../consts";
import styles from "./CustomDataViewer.module.scss";

interface CustomComponentProps<T> {
  columns: CustomDataViewerColumn<T>[];
  data: T[];
  dataKey: (record: T) => React.Key;
  actions?: CustomDataViewerAction<T>[];
  pagination?: CustomDataViewerPagination;
  isCardView?: boolean;
}

export function CustomDataViewer<T>({
  isCardView,
  actions,
  pagination,
  dataKey,
  data: sourceData,
  columns,
}: CustomComponentProps<T>) {
  const data = usePagination(sourceData, pagination);
  const allActions = actions ?? [];
  const recordActions = allActions.filter(
    (a) => a.type !== CustomTableActionType.Create,
  );
  const createAction = allActions.find(
    (a) => a.type === CustomTableActionType.Create,
  );

  useEffect(() => {
    pagination?.onPageChange(1);
  }, [sourceData?.length]);

  return (
    <>
      {createAction && (
        <Button
          label={CustomTableActionTypeNames[createAction.type]}
          onClick={() => createAction?.onClick(null)}
          className={styles.content__createButton}
        />
      )}
      {isCardView ? (
        <CustomCards
          data={data}
          columns={columns}
          dataKey={dataKey}
          actions={recordActions}
        />
      ) : (
        <CustomTable
          columns={columns}
          data={data}
          dataKey={dataKey}
          actions={recordActions}
        />
      )}

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
