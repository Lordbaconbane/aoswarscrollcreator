import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Draft } from "immer";

interface CanvasState {
  canvasRef: Draft<HTMLCanvasElement> | null;
}

const initialState: CanvasState = {
  canvasRef: null,
};

export const unitCardSlice = createSlice({
  name: "warscroll",
  initialState,
  reducers: {
    setCanvasRef: (state, action: PayloadAction<HTMLCanvasElement | null>) => {
      state.canvasRef = action.payload as Draft<HTMLCanvasElement> | null;
    },
    downloadImage: (state) => {
      const canvas = state.canvasRef;
      if (canvas) {
        const context = canvas.getContext("2d");
        if (context) {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = "Warscroll.png"; // Make this the proper name later.
          link.click();
        }
      }
    },
  },
});

export const { setCanvasRef, downloadImage } = unitCardSlice.actions;
export default unitCardSlice.reducer;
