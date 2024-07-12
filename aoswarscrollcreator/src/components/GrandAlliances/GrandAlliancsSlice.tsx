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
  factionTemplate: "src/assets/FactionBackgrounds/AoS4DefaultTemplate.png",
  factionWeaponBanner:
    "src/assets/FactionBackgrounds/Order/Seraphon/Seraphon_Weapon_Banner.png",
};

// Our slice!
export const factionSlice = createSlice({
  name: "faction",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setGrandAlliance: (state, action: PayloadAction<string>) => {
      state.grandAlliance = action.payload;
      console.log("Grand Alliance: ", state.factionName);
    },
    setFactionName: (state, action: PayloadAction<string>) => {
      state.factionName = action.payload;
      console.log("Faction name: ", state.factionName);
    },
    setFactionTemplate: (state, action: PayloadAction<string>) => {
      state.factionTemplate = action.payload;
      console.log("Faction Template:", state.factionTemplate);
    },
    setFactionWeaponBanner: (state, action: PayloadAction<string>) => {
      state.factionWeaponBanner = action.payload;
      console.log("Faction Template:", state.factionWeaponBanner);
    },
  },
  // "Create slice will infer the state tupe from the initialState argument"
});

export const {
  setFactionName,
  setFactionTemplate,
  setGrandAlliance,
  setFactionWeaponBanner,
} = factionSlice.actions;

export default factionSlice.reducer;
