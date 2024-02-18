import { CustomTableActionType } from "../../enum";

export interface CustomTableAction<T> {
  type: CustomTableActionType;
  onClick: (record: T) => void;
}
