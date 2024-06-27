import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface CharacteristicState {
  warscrollName: string;
  warscrollMove: string;
  warscrollHealth: string;
  warscrollControl: string;
  warscrollSave: string;
}

const initialState: CharacteristicState = {
  warscrollName: "1",
  warscrollMove: "1",
  warscrollHealth: "1",
  warscrollControl: "1",
  warscrollSave: "1",
};

// Our slice!
export const characteristicSlice = createSlice({
  name: "characteristics",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setWarscrollName: (state, action: PayloadAction<string>) => {
      state.warscrollName = action.payload;
    },
    setWarscrollMove: (state, action: PayloadAction<string>) => {
      state.warscrollMove = action.payload;
    },
    setWarscrollHealth: (state, action: PayloadAction<string>) => {
      state.warscrollHealth = action.payload;
    },
    setWarscrollControl: (state, action: PayloadAction<string>) => {
      state.warscrollControl = action.payload;
    },
    setWarscrollSave: (state, action: PayloadAction<string>) => {
      state.warscrollSave = action.payload;
      console.log("Save: ", state.warscrollSave);
    },
  },
  // "Create slice will infer the state tupe from the initialState argument"
});

export const {
  setWarscrollName,
  setWarscrollControl,
  setWarscrollHealth,
  setWarscrollMove,
  setWarscrollSave,
} = characteristicSlice.actions;

export default characteristicSlice.reducer;
