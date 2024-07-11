import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MeleeWeaponStats } from "./MeleeWeapons";
import { RangedWeaponStats } from "./RangedWeapons";

export interface WeaponsState {
  meleeWeaponStats: MeleeWeaponStats[];
  rangedWeaponsStats: RangedWeaponStats[];
}

const initialState: WeaponsState = {
  meleeWeaponStats: [],
  rangedWeaponsStats: [],
};

// Our slice!
export const weaponsSlice = createSlice({
  name: "weapons",
  initialState,
  reducers: {
    setMeleeWeapons: (state, action: PayloadAction<MeleeWeaponStats[]>) => {
      state.meleeWeaponStats = action.payload;
    },
    setRangedWeapons: (
      state,
      action: PayloadAction<Array<RangedWeaponStats>>
    ) => {
      state.rangedWeaponsStats = action.payload;
    },
  },
  // "Create slice will infer the state tupe from the initialState argument"
});

export const { setMeleeWeapons, setRangedWeapons } = weaponsSlice.actions;

export default weaponsSlice.reducer;
