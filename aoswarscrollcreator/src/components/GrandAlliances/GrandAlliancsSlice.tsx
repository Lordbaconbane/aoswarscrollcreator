import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface FactionState {
  factionName: string;
}

const initialState: FactionState = {
  factionName: "Default",
};

// Our slice!
export const factionSlice = createSlice({
  name: "faction",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setFactionName: (state, action: PayloadAction<string>) => {
      state.factionName = action.payload;
      console.log("Faction name: ", state.factionName);
    },
  },
  // "Create slice will infer the state tupe from the initialState argument"
});

export const { setFactionName } = factionSlice.actions;

export default factionSlice.reducer;
