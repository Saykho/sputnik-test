import { Character } from "./character";

export type GetCharacter = Omit<Character, "alternateNames"> & {
  alternate_names: string[];
};
