import React, { useRef, useEffect } from "react";
import { Container, Box } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { resetDownload } from "./WarscrollCardSlice";

const charFontSize = 26;
const factionTitleFontSize = 12;
const warscrollNameFontSize = 30;

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
  context.textAlign = "center";
  context.fillText(text, x, y); // Change the coordinates as needed
};

const drawWarscrollTitleTextOnCanvas = (
  context: CanvasRenderingContext2D,
  factionText: string,
  warscrollName: string,
  subtitle: string,
  y: number
) => {
  const offset = 75;
  const x = context.canvas.width / 2 + offset;
  context.textAlign = "center";

  context.font = warscrollNameFontSize.toString() + "px Minion Pro";
  context.fillStyle = "white";

  if (warscrollName.length >= 20) {
    const words = warscrollName.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if ((currentLine + word).length <= 20) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    console.log(lines);
    // Draw each line of warscrollName
    for (let i = 0; i < lines.length; i++) {
      console.log("here");
      context.fillText(lines[i], x, y - 10 + i * warscrollNameFontSize);
    }
    context.font = factionTitleFontSize.toString() + "px Minion Pro Bold";
    context.fillText(subtitle, x, y + 40);
    context.fillText(factionText, x, y - 45);
  }
  // If there is only one line, default to this.
  else {
    context.fillText(warscrollName, x, y);
    context.font = factionTitleFontSize.toString() + "px Minion Pro Bold";
    context.fillText(subtitle, x, y + 20);
    context.fillText(factionText, x, y - 35);
  }
};

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

  const factionName = useSelector(
    (state: RootState) => state.faction.factionName
  );

  const warscrollName = useSelector(
    (state: RootState) => state.characteristics.warscrollName
  );

  const warscrollSubtype = useSelector(
    (state: RootState) => state.characteristics.warscrollSubtype
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
          warscrollName.toUpperCase(),
          warscrollSubtype.toUpperCase(),
          115
        );
        drawTextOnCanvas(context, moveChar, 104, 80, charFontSize);
        drawTextOnCanvas(context, controlChar, 104, 147, charFontSize);
        drawTextOnCanvas(context, healthChar, 74, 115, charFontSize);
        drawTextOnCanvas(context, saveChar, 137, 115, charFontSize);
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
    warscrollSubtype,
  ]); // This is your dependency. If you want useEffect to rerun, add stuff to this!!

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 2,
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
