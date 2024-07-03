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
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

const drawTextOnCanvas = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number
) => {
  context.font = fontSize.toString() + "px Minion Pro";
  context.fillStyle = "white";
  context.fillText(text, x, y); // Change the coordinates as needed
};

const drawWarscrollTitleTextOnCanvas = (
  context: CanvasRenderingContext2D,
  text: string,
  y: number,
  fontSize: number
) => {
  //const offset = 150;
  const textWidth = context.measureText(text).width;
  console.log("Text width: " + textWidth);
  const canvasCenterX = context.canvas.width / 2;
  console.log("Canvas width: " + canvasCenterX);
  const textCenter = canvasCenterX - textWidth / 2;

  context.font = fontSize.toString() + "px Minion Pro";
  context.fillStyle = "white";

  context.fillText(text, textCenter - 10, y); // Change the coordinates as needed
};

const charFontSize = 26;

const WarscrollCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(new Image());
  const dispatch = useDispatch();

  const triggerDownload = useSelector(
    (state: RootState) => state.warscroll.triggerDownload
  );

  const factionTemplate = useSelector(
    (state: RootState) => state.faction.factionTemplate
  );

  // Warscroll Characteristics

  const factionName = useSelector(
    (state: RootState) => state.faction.factionName
  );

  const warscrollName = useSelector(
    (state: RootState) => state.characteristics.warscrollName
  );

  const moveChar = useSelector(
    (state: RootState) => state.characteristics.warscrollMove
  );

  const healthChar = useSelector(
    (state: RootState) => state.characteristics.warscrollHealth
  );

  const saveChar = useSelector(
    (state: RootState) => state.characteristics.warscrollSave
  );

  const controlChar = useSelector(
    (state: RootState) => state.characteristics.warscrollControl
  );

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

  // Runs on initial render but will rerun if you fill the dependency.
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const image = imageRef.current;

    image.src = factionTemplate;
    image.onload = () => {
      if (context && canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawImageOnCanvas(context, image, canvas);
        drawWarscrollTitleTextOnCanvas(
          context,
          "• " + factionName.toUpperCase() + " WARSCROLL •",
          77,
          16
        );
        drawWarscrollTitleTextOnCanvas(
          context,
          warscrollName.toUpperCase(),
          115,
          40
        );
        drawTextOnCanvas(context, moveChar, 97, 84, charFontSize);
        drawTextOnCanvas(context, controlChar, 97, 145, charFontSize);
        drawTextOnCanvas(context, healthChar, 65, 115, charFontSize);
        drawTextOnCanvas(context, saveChar, 130, 115, charFontSize);
      }
    };
  }, [
    factionName,
    factionTemplate,
    warscrollName,
    moveChar,
    healthChar,
    controlChar,
    saveChar,
  ]); // This is your dependency. If you want useEffect to rerun, add stuff to this!!

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
          width={658}
          height={995}
          style={{ border: "1px solid #000" }}
        />
      </Container>
    </Box>
  );
};

export default WarscrollCard;
