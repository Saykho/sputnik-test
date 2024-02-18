import React from "react";
import { CustomTableActionType } from "../../enum";

export interface CustomTableAction<T> {
  actionKey: React.Key;
  type: CustomTableActionType;
  onClick: (record: T) => void;
  customRender?: (record: T) => React.ReactNode;
}
