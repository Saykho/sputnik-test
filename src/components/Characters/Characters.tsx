import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { getCharactersInfo } from "../../store/slices/character-slice";
import { getCharacters } from "../../store/async-actions";
import { CustomTable } from "../CharacterInfo";

export const Characters: React.FC = () => {
  const dispatch = useAppDispatch();
  const characters = useSelector(getCharactersInfo);

  useEffect(() => {
    dispatch(getCharacters());
  }, []);

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
    />
  );
};
