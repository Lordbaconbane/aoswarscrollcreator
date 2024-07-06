import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface KeywordsState {
  isHero: boolean;
  isUnique: boolean;
  isWizard: boolean;
  wizardValue: number;
  isWard: boolean;
  wardValue: number;
  isChampion: boolean;
  championValue: number;
  isStandard: boolean;
  standardValue: number;
  isMusician: boolean;
  musicianValue: number;
}

const initialState: KeywordsState = {
  isHero: false,
  isUnique: false,
  isWizard: false,
  wizardValue: 1,
  isWard: false,
  wardValue: 6,
  isChampion: false,
  championValue: 1,
  isStandard: false,
  standardValue: 1,
  isMusician: false,
  musicianValue: 1,
};

// Our slice!
export const keywordsSlice = createSlice({
  name: "keywords",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setIsHero: (state, action: PayloadAction<boolean>) => {
      state.isHero = action.payload;
    },
    setIsUnique: (state, action: PayloadAction<boolean>) => {
      state.isUnique = action.payload;
    },
    setIsWizard: (state, action: PayloadAction<boolean>) => {
      state.isWizard = action.payload;
    },
    setWizardValue: (state, action: PayloadAction<number>) => {
      state.wizardValue = action.payload;
    },
    setIsWard: (state, action: PayloadAction<boolean>) => {
      state.isWard = action.payload;
    },
    setWardValue: (state, action: PayloadAction<number>) => {
      state.wardValue = action.payload;
    },
    setIsChampion: (state, action: PayloadAction<boolean>) => {
      state.isChampion = action.payload;
    },
    setChampionValue: (state, action: PayloadAction<number>) => {
      state.championValue = action.payload;
    },
    setIsStandard: (state, action: PayloadAction<boolean>) => {
      state.isStandard = action.payload;
    },
    setStandardValue: (state, action: PayloadAction<number>) => {
      state.standardValue = action.payload;
    },
    setIsMusician: (state, action: PayloadAction<boolean>) => {
      state.isMusician = action.payload;
    },
    setMusicianValue: (state, action: PayloadAction<number>) => {
      state.musicianValue = action.payload;
    },
  },
  // "Create slice will infer the state tupe from the initialState argument"
});

export const {
  setChampionValue,
  setIsHero,
  setIsChampion,
  setIsMusician,
  setIsStandard,
  setIsUnique,
  setIsWard,
  setIsWizard,
  setMusicianValue,
  setStandardValue,
  setWardValue,
  setWizardValue,
} = keywordsSlice.actions;

export default keywordsSlice.reducer;
