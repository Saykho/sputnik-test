import React from "react";
import { CustomTableActionType } from "../../enum";

export interface CustomDataViewerAction<T> {
  actionKey: React.Key;
  type: CustomTableActionType;
  onClick: (record: T | null) => void;
  customRender?: (record: T) => React.ReactNode;
}
