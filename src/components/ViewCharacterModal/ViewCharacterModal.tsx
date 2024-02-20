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
        <Text>Имя: {character.name}</Text>
        <Text>Патронус: {character.patronus}</Text>
        <Image src={character.image} alt="Avatar" />
      </Box>
    </Layer>
  );
};
