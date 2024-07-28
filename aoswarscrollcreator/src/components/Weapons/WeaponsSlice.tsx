import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MeleeWeaponStats } from "./MeleeWeapons";
import { RangedWeaponStats } from "./RangedWeapons";

export interface WeaponsState {
  meleeWeaponStats: MeleeWeaponStats[];
  rangedWeaponsStats: RangedWeaponStats[];
  allWeaponNames: Array<string>;
}

const initialState: WeaponsState = {
  meleeWeaponStats: [],
  rangedWeaponsStats: [],
  allWeaponNames: [],
};

// Our slice!
export const weaponsSlice = createSlice({
  name: "weapons",
  initialState,
  reducers: {
    setMeleeWeapons: (state, action: PayloadAction<MeleeWeaponStats[]>) => {
      state.meleeWeaponStats = action.payload;
    },
    setRangedWeapons: (state, action: PayloadAction<Array<RangedWeaponStats>>) => {
      state.rangedWeaponsStats = action.payload;
    },
    setAllWeaponNames: (state) => {
      console.log("He;wefwefwfwe");
      state.allWeaponNames.length = 0;
      for (let i = 0; i < state.meleeWeaponStats.length; i++) {
        state.allWeaponNames.push(state.meleeWeaponStats[i].name);
      }
      for (let i = 0; i < state.rangedWeaponsStats.length; i++) {
        state.allWeaponNames.push(state.rangedWeaponsStats[i].name);
      }
    },
  },
  // "Create slice will infer the state tupe from the initialState argument"
});

export const { setMeleeWeapons, setRangedWeapons, setAllWeaponNames } = weaponsSlice.actions;

export default weaponsSlice.reducer;
