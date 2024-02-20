import React from "react";
import { Box, Pagination } from "grommet";
import {
  CustomCardHeader,
  CustomDataViewerAction,
  CustomDataViewerColumn,
  CustomDataViewerPagination,
} from "../../models";
import { usePagination } from "../CustomTable/usePagination";
import { CustomCards } from "../CustomCards";
import { CustomTable } from "../CustomTable";

interface CustomComponentProps<T> {
  columns: CustomDataViewerColumn<T>[];
  data: T[];
  dataKey: (record: T) => React.Key;
  actions?: CustomDataViewerAction<T>[];
  pagination?: CustomDataViewerPagination;
  isCardView?: boolean;
  card?: CustomCardHeader<T>;
}

export function CustomDataViewer<T>({
  card,
  isCardView,
  actions,
  pagination,
  dataKey,
  data: sourceData,
  columns,
}: CustomComponentProps<T>) {
  const data = usePagination(sourceData, pagination);

  return (
    <>
      {isCardView ? (
        <CustomCards
          data={data}
          card={card}
          columns={columns}
          dataKey={dataKey}
          actions={actions}
        />
      ) : (
        <CustomTable
          columns={columns}
          data={data}
          dataKey={dataKey}
          actions={actions}
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
