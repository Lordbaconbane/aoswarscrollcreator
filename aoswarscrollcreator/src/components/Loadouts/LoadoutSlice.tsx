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
    setLoadoutPoint: (state, action: PayloadAction<{ index: number; value: string }>) => {
      const { index, value } = action.payload;
      if (index >= 0 && index < state.points.length) {
        state.points[index] = value;
      }
    },
    addLoadoutPoint: (state, action: PayloadAction<string>) => {
      state.points.push(action.payload);
      console.log("Length: " + state.points.length);
    },
    removeLoadoutPoint: (state, action: PayloadAction<number>) => {
      console.log("Index value: " + action.payload);
      state.points.splice(action.payload, 1);
    },
  },
  // "Create slice will infer the state tupe from the initialState argument"
});

export const { setLoadoutBody, setLoadoutPoint, addLoadoutPoint, removeLoadoutPoint } =
  loadoutSlice.actions;

export default loadoutSlice.reducer;
