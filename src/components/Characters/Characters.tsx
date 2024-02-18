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

  return <CustomTable characters={characters} />;
};
