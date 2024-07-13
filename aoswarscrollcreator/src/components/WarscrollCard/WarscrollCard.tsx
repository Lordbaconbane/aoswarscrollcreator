import React, { useRef, useEffect } from "react";
import { Container, Box } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { resetDownload } from "./WarscrollCardSlice";
import { RangedWeaponStats } from "../Weapons/RangedWeapons";
import { MeleeWeaponStats } from "../Weapons/MeleeWeapons";

const charFontSize = 26;
const warscrollTitleCharPerLine = 20;
const factionTitleFontSize = 12;
const warscrollNameFontSize = 30;
const weaponPosAnchorX = 10;
const weaponPosAnchorY = 200;
const textPosAnchorY = 232;

const drawImageOnCanvas = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvas: HTMLCanvasElement
) => {
  context.globalAlpha = 1;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

const drawWeaponsOnCanvas = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  rangedWeapons: RangedWeaponStats[],
  meleeWeapons: MeleeWeaponStats[]
) => {
  const width = 640;
  let height = 20;
  context.globalAlpha = 1;

  /* Draw out ranged weapon text */
  if (rangedWeapons.length > 0 || meleeWeapons.length > 0) {
    context.drawImage(image, weaponPosAnchorX, weaponPosAnchorY, width, height);

    if (rangedWeapons.length > 0) {
      drawTextOnCanvas(
        context,
        "RANGED WEAPONS",
        110,
        215,
        12,
        "center",
        "white"
      );
      drawTextOnCanvas(context, "Rng", 240, 215, 12, "center", "white");
      drawTextOnCanvas(context, "Atk", 280, 215, 12, "center", "white");
      drawTextOnCanvas(context, "Hit", 320, 215, 12, "center", "white");
      drawTextOnCanvas(context, "Wnd", 360, 215, 12, "center", "white");
      drawTextOnCanvas(context, "Rnd", 400, 215, 12, "center", "white");
      drawTextOnCanvas(context, "Dmg", 440, 215, 12, "center", "white");
      drawTextOnCanvas(context, "Ability", 550, 215, 12, "center", "white");
      let textOffset = 1;
      let imageOffset = 20;
      for (let i = 0; i < rangedWeapons.length; i++) {
        let isDoubleSpaced = false;
        // Check if the Name is long enough to be double spaced/
        if (rangedWeapons[i].name.length > 28) {
          isDoubleSpaced = true;
          height += 20;
          const lines = splitTextToLines(27, rangedWeapons[i].name);
          // If they are, draw them double spaced. .
          let tempOffset = textOffset;
          for (let i = 0; i < lines.length; i++) {
            drawTextOnCanvas(
              context,
              lines[i],
              111,
              textPosAnchorY + (i + 2) + tempOffset,
              14,
              "center",
              "black"
            );
            tempOffset += 16.5;
            console.log(textPosAnchorY + (i + 1) + textOffset);
          }
          //
        } else {
          drawTextOnCanvas(
            context,
            rangedWeapons[i].name,
            111,
            textPosAnchorY + (i + 1) + textOffset,
            14,
            "center",
            "black"
          );
          console.log(textPosAnchorY + (i + 1) + textOffset);
        }
        drawTextOnCanvas(
          context,
          rangedWeapons[i].range,
          240,
          textPosAnchorY + (i + 1) + textOffset,
          12,
          "center",
          "black"
        );
        drawTextOnCanvas(
          context,
          rangedWeapons[i].atk,
          280,
          textPosAnchorY + (i + 1) + textOffset,
          12,
          "center",
          "black"
        );
        drawTextOnCanvas(
          context,
          rangedWeapons[i].toHit,
          320,
          textPosAnchorY + (i + 1) + textOffset,
          12,
          "center",
          "black"
        );
        drawTextOnCanvas(
          context,
          rangedWeapons[i].toWound,
          360,
          textPosAnchorY + (i + 1) + textOffset,
          12,
          "center",
          "black"
        );
        drawTextOnCanvas(
          context,
          rangedWeapons[i].rend,
          400,
          textPosAnchorY + (i + 1) + textOffset,
          12,
          "center",
          "black"
        );
        drawTextOnCanvas(
          context,
          rangedWeapons[i].damage,
          440,
          textPosAnchorY + (i + 1) + textOffset,
          12,
          "center",
          "black"
        );

        // Check if the Abilities are double long enough to be double spaced/
        if (rangedWeapons[i].ability.length > 28) {
          // Check if we're already double spaced. If we are, we don't need to change the offset.
          if (!isDoubleSpaced) {
            isDoubleSpaced = true;
            height += 20;
          }

          const lines = splitTextToLines(29, rangedWeapons[i].ability);
          let tempOffset = textOffset;
          // If they are, draw them double spaced. .
          for (let i = 0; i < lines.length; i++) {
            drawTextOnCanvas(
              context,
              lines[i],
              550,
              textPosAnchorY + (i + 1) + tempOffset,
              14,
              "center",
              "black"
            );
            console.log(textPosAnchorY + (i + 1) + textOffset);
            tempOffset += 17;
          }
          //
        } else {
          drawTextOnCanvas(
            context,
            rangedWeapons[i].ability,
            550,
            textPosAnchorY + (i + 1) + textOffset,
            14,
            "center",
            "black"
          );
        }
        // Check if odd or even. Odd means fully transparent, even means partially
        if (i % 2 === 0) {
          context.globalAlpha = 0.1;
        } else {
          context.globalAlpha = 0.3;
        }

        // Finally, draw our image
        context.drawImage(
          image,
          weaponPosAnchorX,
          weaponPosAnchorY + imageOffset,
          width,
          height
        );

        /* If we're double spacd, add extra offset, but reduce the height as the next 
        line is assumed to be single space. */
        if (isDoubleSpaced) {
          height -= 20;
          textOffset += 20;
          imageOffset += 20;
        }
        textOffset += 20;
        imageOffset += 20;
      }
    }
  }
};

const drawTextOnCanvas = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  alignment: CanvasTextAlign,
  fontColor: string
) => {
  context.font = fontSize.toString() + "px Minion Pro";
  context.fillStyle = fontColor;
  context.textAlign = alignment;
  context.globalAlpha = 1;
  context.fillText(text, x, y); // Change the coordinates as needed
  context.strokeText;
};

const splitTextToLines = (charLimit: number, text: string): string[] => {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if ((currentLine + word).length <= charLimit) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
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
  context.globalAlpha = 1;
  context.font = warscrollNameFontSize.toString() + "px Minion Pro";
  context.fillStyle = "white";

  if (warscrollName.length >= warscrollTitleCharPerLine) {
    const lines = splitTextToLines(warscrollTitleCharPerLine, warscrollName);
    // Draw each line of warscrollName
    for (let i = 0; i < lines.length; i++) {
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
  const weaponBannerImageRef = useRef<HTMLImageElement>(new Image());
  const dispatch = useDispatch();

  const triggerDownload = useSelector(
    (state: RootState) => state.warscroll.triggerDownload
  );

  const factionTemplate = useSelector(
    (state: RootState) => state.faction.factionTemplate
  );

  const factionWeaponBanner = useSelector(
    (state: RootState) => state.faction.factionWeaponBanner
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

  const keywordIdentities = useSelector(
    (state: RootState) => state.keywords.keywordIdentities
  );

  const keywordAbilities = useSelector(
    (state: RootState) => state.keywords.keywordAbilities
  );

  const meleeWeapons = useSelector(
    (state: RootState) => state.weapons.meleeWeaponStats
  );

  const rangedWeapons = useSelector(
    (state: RootState) => state.weapons.rangedWeaponsStats
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
    const weaponBannerImage = weaponBannerImageRef.current;

    image.src = factionTemplate;
    weaponBannerImage.src = factionWeaponBanner;
    image.onload = () => {
      if (context && canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawImageOnCanvas(context, image, canvas);
        drawWeaponsOnCanvas(
          context,
          weaponBannerImage,
          rangedWeapons,
          meleeWeapons
        );
        // Draw title
        drawWarscrollTitleTextOnCanvas(
          context,
          "• " + factionName.toUpperCase() + " WARSCROLL •",
          warscrollName.toUpperCase(),
          warscrollSubtype.toUpperCase(),
          115
        );
        // Draw characteristics
        drawTextOnCanvas(
          context,
          moveChar,
          104,
          80,
          charFontSize,
          "center",
          "white"
        );
        drawTextOnCanvas(
          context,
          controlChar,
          104,
          147,
          charFontSize,
          "center",
          "white"
        );
        drawTextOnCanvas(
          context,
          healthChar,
          74,
          115,
          charFontSize,
          "center",
          "white"
        );
        drawTextOnCanvas(
          context,
          saveChar,
          137,
          115,
          charFontSize,
          "center",
          "white"
        );
        // Draw Keywords
        drawTextOnCanvas(
          context,
          keywordAbilities.join(", ").toUpperCase(),
          context.canvas.width / 2,
          932,
          11,
          "center",
          "black"
        );
        drawTextOnCanvas(
          context,
          keywordIdentities.join(", ").toUpperCase(),
          context.canvas.width / 2,
          960,
          11,
          "center",
          "black"
        );
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
    keywordIdentities,
    keywordAbilities,
    meleeWeapons,
    rangedWeapons,
    factionWeaponBanner,
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
