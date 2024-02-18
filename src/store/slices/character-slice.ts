import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Character } from "../../models";
import { getCharacters } from "../async-actions";
import { StateStatus } from "../../enum";

interface CharactersState {
  characters: Character[];
  status: StateStatus;
  error: string | null;
}

const initialState: CharactersState = {
  characters: [],
  status: StateStatus.idle,
  error: null,
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCharacters.pending, (state) => ({
      ...state,
      error: null,
      status: StateStatus.loading,
    }));
    builder.addCase(getCharacters.fulfilled, (state, { payload }) => ({
      ...state,
      status: StateStatus.idle,
      characters: payload,
    }));
    builder.addCase(getCharacters.rejected, (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          error: payload.message,
        };
      }
      return {
        ...state,
        status: StateStatus.idle,
      };
    });
  },
});

type WithCharactersState = {
  characters: CharactersState;
};

export const charactersStateSelector = (
  state: WithCharactersState,
): CharactersState => state.characters;

export const getCharactersInfo = createSelector(
  charactersStateSelector,
  (state) => {
    return state.characters;
  },
);

export default charactersSlice.reducer;
