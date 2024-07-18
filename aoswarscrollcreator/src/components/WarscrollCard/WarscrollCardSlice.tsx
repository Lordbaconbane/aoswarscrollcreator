import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface warscrollState {
  yAnchor: number;
}

export const warscrollCardSlice = createSlice({
  name: "warscrollDownload",
  initialState: {
    triggerDownload: false,
    yAnchor: 0,
  },
  reducers: {
    initDownload: (state) => {
      state.triggerDownload = true;
    },
    resetDownload: (state) => {
      state.triggerDownload = false;
    },
    setAnchor: (state, action: PayloadAction<number>) => {
      state.yAnchor = action.payload;
    },
  },
});

export const { initDownload, resetDownload } = warscrollCardSlice.actions;
export default warscrollCardSlice.reducer;
