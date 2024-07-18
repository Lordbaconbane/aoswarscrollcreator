import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface LoadoutState {
  body: string;
  points: Array<string>;
}

const initialState: LoadoutState = {
  body: "",
  points: [],
};

// Our slice!
export const loadoutSlice = createSlice({
  name: "loadout",
  initialState,
  reducers: {
    setLoadoutBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload;
    },
    setLoadoutPoints: (state, action: PayloadAction<Array<string>>) => {
      state.points = action.payload;
    },
    addLoadoutPoint: (state, action: PayloadAction<string>) => {
      state.points.push(action.payload);
      console.log("Length: " + state.points.length);
    },
  },
  // "Create slice will infer the state tupe from the initialState argument"
});

export const { setLoadoutBody, setLoadoutPoints, addLoadoutPoint } = loadoutSlice.actions;

export default loadoutSlice.reducer;
