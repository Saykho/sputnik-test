import React from "react";
import { Box, Image, Layer, Text } from "grommet";
import { Character } from "../../models";

interface ViewCharacterModalProps {
  character: Character | null;
  onClose: () => void;
}

export const ViewCharacterModal: React.FC<ViewCharacterModalProps> = ({
  character,
  onClose,
}) => {
  if (!character) {
    return null;
  }

  return (
    <Layer onClickOutside={onClose}>
      <Box gap="medium" pad="medium">
        <Text>Name: {character.name}</Text>
        <Text>Date of birth: {character.dateOfBirth}</Text>
        <Text>Year of birth: {character.yearOfBirth}</Text>
        <Text>Ancestry: {character.ancestry}</Text>
        <Text>Patronus: {character.patronus}</Text>
        <Image src={character.image} alt="Avatar" />
      </Box>
    </Layer>
  );
};
