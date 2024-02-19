import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "grommet";
import { useAppDispatch } from "../../hooks";
import { getCharactersInfo } from "../../store/slices/character-slice";
import { getCharacters } from "../../store/async-actions";
import { Character } from "../../models";
import { CustomFilter } from "../CustomFilter";
import { CustomTable } from "../CustomTable";
import { CustomTableActionType } from "../../enum";
import { useFilter } from "../CustomFilter/useFilter";

const SendCharacterButton = ({ name }: Character) => {
  return <Button label={`Отправить сообщение для ${name}`} />;
};

export const Characters: React.FC = () => {
  const dispatch = useAppDispatch();
  const characters = useSelector(getCharactersInfo);

  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const { data: dataByHouse, setFilters: setHouseFilters } = useFilter(
    characters,
    (character) => character.house,
  );

  const { data: dataByGender, setFilters: setGenderFilters } = useFilter(
    dataByHouse,
    (character) => character.gender,
  );

  useEffect(() => {
    dispatch(getCharacters());
  }, []);

  const onUpdate = (character: Character) => {
    console.log("On delete", character);
  };

  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <CustomFilter
        data={characters}
        filterName="House"
        filterValue={(character) => character.house}
        onSubmit={setHouseFilters}
      />

      <CustomFilter
        data={characters}
        filterName="Gender"
        filterValue={(character) => character.gender}
        onSubmit={setGenderFilters}
      />

      <CustomTable
        data={dataByGender}
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
            actionKey: CustomTableActionType.Delete,
          },
          {
            type: CustomTableActionType.Edit,
            onClick: onUpdate,
            actionKey: CustomTableActionType.Edit,
          },
          {
            type: CustomTableActionType.Custom,
            onClick: onUpdate,
            customRender: SendCharacterButton,
            actionKey: CustomTableActionType.Custom,
          },
          {
            type: CustomTableActionType.Custom,
            onClick: onUpdate,
            customRender: SendCharacterButton,
            actionKey: "asdlfwoe",
          },
        ]}
        pagination={{
          pageSize,
          currentPage: page,
          onPageChange,
        }}
      />
    </>
  );
};
