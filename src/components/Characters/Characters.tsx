import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Grid, Heading, Layer } from "grommet";
import { useAppDispatch } from "../../hooks";
import { getCharactersInfo } from "../../store/slices/character-slice";
import { getCharacters } from "../../store/async-actions";
import { Character } from "../../models";
import { CustomFilter } from "../CustomFilter";
import { CustomTable } from "../CustomTable";
import { CustomTableActionType } from "../../enum";
import { useFilter } from "../CustomFilter/useFilter";
import { pageSize } from "../../consts";

const SendCharacterButton = ({ name }: Character) => {
  return <Button label={`Отправить сообщение для ${name}`} />;
};

export const Characters: React.FC = () => {
  const dispatch = useAppDispatch();
  const characters = useSelector(getCharactersInfo);

  const [page, setPage] = useState<number>(1);

  const [show, setShow] = useState<boolean>(false);

  const { data: dataByHouse, setFilters: setHouseFilters } = useFilter(
    characters,
    (character) => character.house,
  );

  const { data: dataByGender, setFilters: setGenderFilters } = useFilter(
    dataByHouse,
    (character) => character.gender,
  );

  const { data: dataBySpecies, setFilters: setSpeciesFilters } = useFilter(
    dataByGender,
    (character) => character.species,
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
      <Button label="Другие фильтры" onClick={() => setShow(true)} />
      {show && (
        <Layer onClickOutside={() => setShow(false)}>
          <Box gap="medium" pad="medium" width={{ min: "medium" }} flex="grow">
            <Heading level={3} margin="none">
              Другие фильтры
            </Heading>
            <Grid columns={["medium", "medium"]} rows={["small", "small"]}>
              <Box pad="small">
                <CustomFilter
                  data={characters}
                  filterName="Gender"
                  filterValue={(character) => character.gender}
                  onSubmit={setGenderFilters}
                />
              </Box>
              <Box pad="medium">
                <CustomFilter
                  data={characters}
                  filterName="Species"
                  filterValue={(character) => character.species}
                  onSubmit={setSpeciesFilters}
                />
              </Box>
            </Grid>
            <Box
              as="footer"
              gap="small"
              direction="row"
              align="center"
              justify="end"
              pad={{ top: "medium", bottom: "small" }}
            >
              <Button label="Закрыть" onClick={() => setShow(false)} />
            </Box>
          </Box>
        </Layer>
      )}

      <CustomTable
        data={dataBySpecies}
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
        ]}
        pagination={{
          pageSize,
          currentPage: page,
          onPageChange,
        }}
        isCardView
        card={{
          cardHeader: (character) => character.name,
        }}
      />
    </>
  );
};
