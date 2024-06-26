import React, { useRef, useEffect } from "react";
import { Container, Box } from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setCanvasRef } from "./UnitCardSlice";

import { useDispatch } from "react-redux";

const drawImageOnCanvas = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvas: HTMLCanvasElement
) => {
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

// const drawTextOnCanvas = (context: CanvasRenderingContext2D, text: string) => {
//   context.font = "28px Arial";
//   context.fillStyle = "red";
//   context.fillText(text, 88, 70); // Change the coordinates as needed
// };
//
// const drawTextOnCanvasSave = (
//   context: CanvasRenderingContext2D,
//   text: string
// ) => {
//   context.font = "28px Arial";
//   context.fillStyle = "red";
//   context.fillText(text, 110, 100); // Change the coordinates as needed
// };
//
// export const HandleDownloadImage = (canvas: HTMLCanvasElement | null): void => {
//   if (canvas) {
//     const context = canvas.getContext("2d");
//     if (context) {
//       const link = document.createElement("a");
//       link.href = canvas.toDataURL("image/png");
//       link.download = "image-with-text.png";
//     }
//   }
// };
//
const UnitCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(new Image());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCanvasRef(canvasRef.current));
  }, [dispatch]);

  const factionName = useSelector(
    (state: RootState) => state.faction.factionTemplate
  );

  // Runs on initial render but will rerun if you fill the dependency.
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const image = imageRef.current;

    image.src = factionName;
    image.onload = () => {
      if (context && canvas) {
        drawImageOnCanvas(context, image, canvas);
      }
    };
  }, [factionName]); // This is your dependency. If you want useEffect to rerun, add stuff to this!!

  //useEffect(() => {
  //  const canvas = canvasRef.current;
  //  const context = canvas?.getContext("2d");
  //  const image = imageRef.current;
  //
  //  if (context && canvas) {
  //    drawImageOnCanvas(context, image, canvas);
  //    if (text) {
  //      drawTextOnCanvas(context, text);
  //      drawTextOnCanvasSave(context, text);
  //    }
  //  }
  //}, [text]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 2,
        border: "dashed purple",
        width: 1,
        marginTop: 8,
      }}
    >
      <Container>
        <canvas
          ref={canvasRef}
          width={600}
          height={800}
          style={{ border: "1px solid #000" }}
        />
      </Container>
    </Box>
  );
};

export default UnitCard;
