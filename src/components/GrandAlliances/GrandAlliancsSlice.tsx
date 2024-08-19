import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FactionBanners, FactionNames, FactionTemplates } from "./FactionTemplateLinks";
export interface FactionState {
  grandAlliance: string;
  factionName: string;
  customFactionName: string;
  factionTemplate: string;
  factionWeaponBanner: string;
}

const initialState: FactionState = {
  grandAlliance: "",
  factionName: FactionNames.StormcastEternals,
  customFactionName: "",
  factionTemplate: FactionTemplates.StormcastEternals,
  factionWeaponBanner: FactionBanners.StormcastEternals,
};

// Our slice!
export const factionSlice = createSlice({
  name: "faction",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setGrandAlliance: (state, action: PayloadAction<string>) => {
      state.grandAlliance = action.payload;
    },
    setFactionName: (state, action: PayloadAction<string>) => {
      state.factionName = action.payload;
    },
    setCustomFactionName: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.customFactionName = action.payload;
    },
    setFactionTemplate: (state, action: PayloadAction<string>) => {
      state.factionTemplate = action.payload;
    },
    setFactionWeaponBanner: (state, action: PayloadAction<string>) => {
      state.factionWeaponBanner = action.payload;
    },
    resetFaction: () => initialState,
  },
  // "Create slice will infer the state tupe from the initialState argument"
});

export const {
  setFactionName,
  setCustomFactionName,
  setFactionTemplate,
  setGrandAlliance,
  setFactionWeaponBanner,
  resetFaction,
} = factionSlice.actions;

export default factionSlice.reducer;
