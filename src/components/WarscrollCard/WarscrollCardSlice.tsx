import { createSlice } from "@reduxjs/toolkit";

export const warscrollCardSlice = createSlice({
  name: "warscrollDownload",
  initialState: {
    triggerDownload: false,
  },
  reducers: {
    initDownload: (state) => {
      state.triggerDownload = true;
    },
    resetDownload: (state) => {
      state.triggerDownload = false;
    },
  },
});

export const { initDownload, resetDownload } = warscrollCardSlice.actions;
export default warscrollCardSlice.reducer;
