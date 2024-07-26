import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface FactionState {
  grandAlliance: string;
  factionName: string;
  factionTemplate: string;
  factionWeaponBanner: string;
}

const initialState: FactionState = {
  grandAlliance: "",
  factionName: "Default",
  factionTemplate: "src/assets/FactionBackgrounds/Order/Stormcast/Stormcast_Warscroll_Template.png",
  factionWeaponBanner: "src/assets/FactionBackgrounds/Order/Stormcast/Stormcast_Weapon_Banner.png",
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
    setFactionTemplate: (state, action: PayloadAction<string>) => {
      state.factionTemplate = action.payload;
    },
    setFactionWeaponBanner: (state, action: PayloadAction<string>) => {
      state.factionWeaponBanner = action.payload;
    },
  },
  // "Create slice will infer the state tupe from the initialState argument"
});

export const { setFactionName, setFactionTemplate, setGrandAlliance, setFactionWeaponBanner } =
  factionSlice.actions;

export default factionSlice.reducer;
