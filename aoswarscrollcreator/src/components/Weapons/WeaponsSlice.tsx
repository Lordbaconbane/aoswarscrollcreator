import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MeleeWeaponStats } from "./MeleeWeapons";
import { RangedWeaponStats } from "./RangedWeapons";

export interface WeaponsState {
  meleeWeaponStats: MeleeWeaponStats[];
  rangedWeaponStats: RangedWeaponStats[];
  allWeaponNames: Array<string>;
}

const initialState: WeaponsState = {
  meleeWeaponStats: [],
  rangedWeaponStats: [],
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
      state.rangedWeaponStats = action.payload;
    },
    setAllWeaponNames: (state) => {
      state.allWeaponNames.length = 0;
      for (let i = 0; i < state.meleeWeaponStats.length; i++) {
        state.allWeaponNames.push(state.meleeWeaponStats[i].name + " (melee)");
      }
      for (let i = 0; i < state.rangedWeaponStats.length; i++) {
        state.allWeaponNames.push(state.rangedWeaponStats[i].name + " (ranged)");
      }
    },
    setBattleDamagedWeapon: (state, action: PayloadAction<string>) => {
      for (let i = 0; i < state.meleeWeaponStats.length; i++) {
        if (action.payload === state.meleeWeaponStats[i].name + " (melee)") {
          state.meleeWeaponStats[i].isBattleDamaged = true;
        } else {
          state.meleeWeaponStats[i].isBattleDamaged = false;
        }
      }
      for (let i = 0; i < state.rangedWeaponStats.length; i++) {
        if (action.payload === state.rangedWeaponStats[i].name + " (ranged)") {
          state.rangedWeaponStats[i].isBattleDamaged = true;
        } else {
          state.rangedWeaponStats[i].isBattleDamaged = false;
        }
      }
    },
  },
  // "Create slice will infer the state tupe from the initialState argument"
});

export const { setMeleeWeapons, setRangedWeapons, setAllWeaponNames, setBattleDamagedWeapon } =
  weaponsSlice.actions;

export default weaponsSlice.reducer;
