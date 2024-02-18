import { CustomTableActionType } from "../enum";

export const CustomTableActionTypeNames = {
  [CustomTableActionType.Delete]: "Удалить",
  [CustomTableActionType.Edit]: "Редактировать",
  [CustomTableActionType.View]: "Просмотреть",
  [CustomTableActionType.Create]: "Создать",
  [CustomTableActionType.Custom]: "add customRender",
};
