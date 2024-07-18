import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ability } from "./Abilities";

export interface AbilitiesState {
  abilities: Ability[];
}

const initialState: AbilitiesState = {
  abilities: [],
};

// Our slice!!
export const abilitiesSlice = createSlice({
  name: "abilities",
  initialState,
  reducers: {
    setAbilities: (state, action: PayloadAction<Ability[]>) => {
      console.log("Slice: " + action.payload.toString());
      state.abilities = action.payload;
    },
  },
});

export const { setAbilities } = abilitiesSlice.actions;

export default abilitiesSlice.reducer;
