import { Character, GetCharacter } from "../models";
import { HttpClient } from "./http-client";

export class CharactersService {
  static getCharacters(): Promise<Character[]> {
    return HttpClient.get<GetCharacter[]>("/characters").then((characters) =>
      characters.map((c) => ({
        ...c,
        alternateNames: c.alternate_names,
      })),
    );
  }
}
