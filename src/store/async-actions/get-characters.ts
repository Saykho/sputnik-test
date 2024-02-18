import { createAsyncThunk } from "@reduxjs/toolkit";
import { Character } from "../../models";
import { CharactersService } from "../../services";

interface GetCharactersError {
  message: string;
}

export const getCharacters = createAsyncThunk<
  Character[],
  undefined,
  { rejectValue: GetCharactersError }
>("getCharacters", async (_, thunkAPI) => {
  try {
    return await CharactersService.getCharacters();
  } catch (e: any) {
    return thunkAPI.rejectWithValue({
      message: e.message,
    });
  }
});
