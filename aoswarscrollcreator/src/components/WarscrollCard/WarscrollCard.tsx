import React, { useRef, useEffect } from "react";
import { Container, Box } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { resetDownload } from "./WarscrollCardSlice";

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

const WarscrollCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(new Image());
  const dispatch = useDispatch();

  const triggerDownload = useSelector(
    (state: RootState) => state.warscroll.triggerDownload
  );

  const factionName = useSelector(
    (state: RootState) => state.faction.factionTemplate
  );

  const warscrollName = useSelector(
    (state: RootState) => state.characteristics.warscrollName
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

  useEffect(() => {
    if (triggerDownload) {
      const canvas = canvasRef.current;
      if (canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = warscrollName + "_Warscroll.png";
        link.click();
      }
      dispatch(resetDownload());
    }
  }, [triggerDownload, dispatch, warscrollName]);

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

export default WarscrollCard;
