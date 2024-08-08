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
    setBattleDamagedWeapon: (state, action: PayloadAction<string[]>) => {
      state.meleeWeaponStats.forEach((weapon) => {
        weapon.isBattleDamaged = false;
      });

      state.rangedWeaponStats.forEach((weapon) => {
        weapon.isBattleDamaged = false;
      });

      action.payload.forEach((damagedWeapon) => {
        state.meleeWeaponStats.forEach((weaponStat, index) => {
          if (weaponStat.name + " (melee)" === damagedWeapon) {
            state.meleeWeaponStats[index].isBattleDamaged = true;
          }
        });
      });

      action.payload.forEach((damagedWeapon) => {
        state.rangedWeaponStats.forEach((weaponStat, index) => {
          if (weaponStat.name + " (ranged)" === damagedWeapon) {
            state.rangedWeaponStats[index].isBattleDamaged = true;
          }
        });
      });
    },
    resetWeapons: () => initialState,
  },
  // "Create slice will infer the state tupe from the initialState argument"
});

export const { setMeleeWeapons, setRangedWeapons, setAllWeaponNames, setBattleDamagedWeapon, resetWeapons } =
  weaponsSlice.actions;

export default weaponsSlice.reducer;
