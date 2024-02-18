import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "grommet";
import { Character } from "../../models";

interface CustomTableProps {
  characters: Character[];
}

export const CustomTable: React.FC<CustomTableProps> = ({ characters }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom">
            Name
          </TableCell>
          <TableCell scope="col" border="bottom">
            House
          </TableCell>
          <TableCell scope="col" border="bottom">
            Gender
          </TableCell>
          <TableCell scope="col" border="bottom">
            Species
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {characters.map((character) => (
          <TableRow key={character.id}>
            <TableCell scope="row">{character.name}</TableCell>
            <TableCell scope="row">
              {character.house === "" ? "---" : character.house}
            </TableCell>
            <TableCell scope="row">{character.gender}</TableCell>
            <TableCell scope="row">{character.species}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
