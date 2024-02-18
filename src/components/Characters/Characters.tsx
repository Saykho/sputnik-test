import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { getCharactersInfo } from "../../store/slices/character-slice";
import { getCharacters } from "../../store/async-actions";
import { CustomTable } from "../CustomTable";
import { Character } from "../../models";
import { CustomTableActionType } from "../../enum";

export const Characters: React.FC = () => {
  const dispatch = useAppDispatch();
  const characters = useSelector(getCharactersInfo);

  useEffect(() => {
    dispatch(getCharacters());
  }, []);

  const onUpdate = (character: Character) => {
    console.log("On delete", character);
  };

  return (
    <CustomTable
      data={characters}
      columns={[
        {
          name: "Name",
          value: (character) => character.name,
        },
        {
          name: "House",
          value: (character) => character.house,
        },
        {
          name: "Gender",
          value: (character) => character.gender,
        },
        {
          name: "Species",
          value: (character) => character.species,
        },
      ]}
      dataKey={(character) => character.id}
      actions={[
        {
          type: CustomTableActionType.Delete,
          onClick: onUpdate,
        },
        {
          type: CustomTableActionType.Edit,
          onClick: onUpdate,
        },
      ]}
    />
  );
};
