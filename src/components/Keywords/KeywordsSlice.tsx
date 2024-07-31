import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface KeywordsState {
  keywordIdentities: Array<string>;
  keywordAbilities: Array<string>;
}

const initialState: KeywordsState = {
  keywordIdentities: [],
  keywordAbilities: [],
};

// Our slice!
export const keywordsSlice = createSlice({
  name: "keywords",
  initialState,
  reducers: {
    setKeywordIdentity: (state, action: PayloadAction<Array<string>>) => {
      state.keywordIdentities = action.payload;
    },

    setKeywordAbility: (state, action: PayloadAction<Array<string>>) => {
      state.keywordAbilities = action.payload;
    },
  },
  // "Create slice will infer the state tupe from the initialState argument"
});

export const { setKeywordIdentity, setKeywordAbility } = keywordsSlice.actions;

export default keywordsSlice.reducer;
