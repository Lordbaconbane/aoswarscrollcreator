import React, { useRef, useEffect } from "react";
import { Container, Box } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { resetDownload } from "./WarscrollCardSlice";
import { RangedWeaponStats } from "../Weapons/RangedWeapons";
import { MeleeWeaponStats } from "../Weapons/MeleeWeapons";

import "../styles.css";
import { Ability } from "../Abilities/Abilities";
const charFontSize = 26;
const warscrollTitleCharPerLine = 20;
const factionTitleFontSize = 12;
const warscrollNameFontSize = 30;
const wpnBannerPosX = 10;
const wpnBannerPosY = 200;
const wpnHeaderYPos = 215;
const textPosY = 232;

const drawImageOnCanvas = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvas: HTMLCanvasElement
) => {
  context.globalAlpha = 1;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

const drawAbilityOnCanvas = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  abilities: Ability[]
) => {
  const xAnchorL = 25;
  //const xAnchorR = 350;
  const yAnchor = 400;
  const canvasWidth = canvas.width / 2 - 50;
  ctx.globalAlpha = 1;

  for (let i = 0; i < abilities.length; i++) {
    const img = new Image();
    img.src = abilities[i].ability_banner;

    img.onload = () => {
      ctx.strokeStyle = abilities[i].ability_line_color;
      ctx.lineWidth = 2;
      ctx.strokeRect(
        xAnchorL + 5 + (i + 1) * 10,
        yAnchor + 5 + (i + 1) * 10,
        canvasWidth - 10,
        100
      );
      ctx.drawImage(img, xAnchorL + (i + 1) * 10, yAnchor + (i + 1) * 10, canvasWidth, 20);
    };

    // if (i % 2 === 0) {
    //
    // } else {
    //
    // }
  }
};

// for (let i = 0; i < abilities.length; i++) {
//
//   img.src = abilities[i].abilitiesBanner;
// }
// image.onload = () => {
//   ctx.drawImage(image, xAnchorL, yAnchor, canvasWidth, 20);
//   ctx.strokeStyle = "darkgreen";
//   ctx.lineWidth = 2;
//   ctx.strokeRect(xAnchorL + 5, yAnchor + 5, canvasWidth - 10, 100);
// };
// }
// image.onload = () => {
// ctx.drawImage(image, xAnchorR, yAnchor, canvasWidth, 20);
// ctx.strokeStyle = "darkgreen";
// ctx.lineWidth = 2;
// ctx.strokeRect(xAnchorR + 5, yAnchor + 5, canvasWidth - 10, 100);
// };

const drawWeaponsOnCanvas = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  rangedWeapons: RangedWeaponStats[],
  meleeWeapons: MeleeWeaponStats[]
) => {
  const width = 640;
  let height = 20;
  context.globalAlpha = 1;
  let textOffset = 1;
  let imageOffset = 20;
  let mWpnBannerYPos = wpnBannerPosY;
  let lineCount = 1;
  /* Draw out ranged weapon text */
  if (rangedWeapons.length > 0 || meleeWeapons.length > 0) {
    context.drawImage(image, wpnBannerPosX, wpnBannerPosY, width, height);

    // If we have ranged weapons
    if (rangedWeapons.length > 0) {
      /* If we have ranged weapons, increment the melee weapon value so if we
          add melee weapons, they'll position corrctly. */
      drawTextOnCanvas(context, "RANGED WEAPONS", 110, wpnHeaderYPos, 12, "center", "white");
      drawTextOnCanvas(context, "Rng", 240, wpnHeaderYPos, 12, "center", "white");
      drawTextOnCanvas(context, "Atk", 280, wpnHeaderYPos, 12, "center", "white");
      drawTextOnCanvas(context, "Hit", 320, wpnHeaderYPos, 12, "center", "white");
      drawTextOnCanvas(context, "Wnd", 360, wpnHeaderYPos, 12, "center", "white");
      drawTextOnCanvas(context, "Rnd", 400, wpnHeaderYPos, 12, "center", "white");
      drawTextOnCanvas(context, "Dmg", 440, wpnHeaderYPos, 12, "center", "white");
      drawTextOnCanvas(context, "Ability", 550, wpnHeaderYPos, 12, "center", "white");

      for (let i = 0; i < rangedWeapons.length; i++) {
        let isDoubleSpaced = false;
        // Check if the Name is long enough to be double spaced/
        if (rangedWeapons[i].name.length > 28) {
          isDoubleSpaced = true;
          height += 20;
          console.log("Ranged Weapon Height: " + height);
          const lines = splitTextToLines(27, rangedWeapons[i].name);
          // If they are, draw them double spaced.
          let tempOffset = textOffset;
          for (let i = 0; i < lines.length; i++) {
            drawTextOnCanvas(
              context,
              lines[i],
              111,
              textPosY + (i + 2) + tempOffset,
              14,
              "center",
              "black"
            );
            tempOffset += 18;
          }
          //
        } else {
          drawTextOnCanvas(
            context,
            rangedWeapons[i].name,
            111,
            textPosY + (i + 1) + textOffset,
            14,
            "center",
            "black"
          );
        }
        drawTextOnCanvas(
          context,
          rangedWeapons[i].range,
          240,
          textPosY + (i + 1) + textOffset,
          12,
          "center",
          "black"
        );
        drawTextOnCanvas(
          context,
          rangedWeapons[i].atk,
          280,
          textPosY + (i + 1) + textOffset,
          12,
          "center",
          "black"
        );
        drawTextOnCanvas(
          context,
          rangedWeapons[i].toHit,
          320,
          textPosY + (i + 1) + textOffset,
          12,
          "center",
          "black"
        );
        drawTextOnCanvas(
          context,
          rangedWeapons[i].toWound,
          360,
          textPosY + (i + 1) + textOffset,
          12,
          "center",
          "black"
        );
        drawTextOnCanvas(
          context,
          rangedWeapons[i].rend,
          400,
          textPosY + (i + 1) + textOffset,
          12,
          "center",
          "black"
        );
        drawTextOnCanvas(
          context,
          rangedWeapons[i].damage,
          440,
          textPosY + (i + 1) + textOffset,
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
              textPosY + (i + 1) + tempOffset,
              14,
              "center",
              "black"
            );
            tempOffset += 18;
          }
          //
        } else {
          drawTextOnCanvas(
            context,
            rangedWeapons[i].ability,
            550,
            textPosY + (i + 1) + textOffset,
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
        context.drawImage(image, wpnBannerPosX, wpnBannerPosY + imageOffset, width, height);

        /* If we're double spacd, add extra offset, but reduce the height as the next 
        line is assumed to be single space. */
        if (isDoubleSpaced) {
          height -= 20;
          textOffset += 20;
          imageOffset += 20;
          lineCount += 1;
        }
        textOffset += 20;
        imageOffset += 20;
        lineCount += 1;
      }
    }
    // If we have melee weapons
    if (meleeWeapons.length > 0) {
      let mBannerTextPos = wpnHeaderYPos;
      let mTextPos = wpnHeaderYPos;
      textOffset = 0;
      console.log("Height at Start: " + height);
      // If we have ranged weapon, increment the text by the current line count.
      if (rangedWeapons.length > 0) {
        mWpnBannerYPos += 20 * lineCount;
        mBannerTextPos += 20 * lineCount;
        mTextPos += 20 * lineCount;
        imageOffset += 20;
      }
      mTextPos += 20;
      context.globalAlpha = 1;
      context.drawImage(image, wpnBannerPosX, mWpnBannerYPos, width, height);

      // Draw Melee Header Text
      drawTextOnCanvas(context, "MELEE WEAPONS", 110, mBannerTextPos, 12, "center", "white");
      drawTextOnCanvas(context, "Atk", 280, mBannerTextPos, 12, "center", "white");
      drawTextOnCanvas(context, "Hit", 320, mBannerTextPos, 12, "center", "white");
      drawTextOnCanvas(context, "Wnd", 360, mBannerTextPos, 12, "center", "white");
      drawTextOnCanvas(context, "Rnd", 400, mBannerTextPos, 12, "center", "white");
      drawTextOnCanvas(context, "Dmg", 440, mBannerTextPos, 12, "center", "white");
      drawTextOnCanvas(context, "Ability", 550, mBannerTextPos, 12, "center", "white");

      for (let i = 0; i < meleeWeapons.length; i++) {
        let isDoubleSpaced = false;
        // Check if the Name is long enough to be double spaced/
        if (meleeWeapons[i].name.length > 28) {
          isDoubleSpaced = true;
          height += 20;
          const lines = splitTextToLines(28, meleeWeapons[i].name);
          // If they are, draw them double spaced.
          let tempOffset = textOffset;
          for (let i = 0; i < lines.length; i++) {
            drawTextOnCanvas(
              context,
              lines[i],
              111,
              mTextPos + (i + 2) + tempOffset,
              14,
              "center",
              "black"
            );
            tempOffset += 18;
          }
          //
        } else {
          drawTextOnCanvas(
            context,
            meleeWeapons[i].name,
            111,
            mTextPos + textOffset,
            14,
            "center",
            "black"
          );
        }
        drawTextOnCanvas(
          context,
          meleeWeapons[i].atk,
          280,
          mTextPos + textOffset,
          12,
          "center",
          "black"
        );
        drawTextOnCanvas(
          context,
          meleeWeapons[i].toHit,
          320,
          mTextPos + textOffset,
          12,
          "center",
          "black"
        );
        drawTextOnCanvas(
          context,
          meleeWeapons[i].toWound,
          360,
          mTextPos + textOffset,
          12,
          "center",
          "black"
        );
        drawTextOnCanvas(
          context,
          meleeWeapons[i].rend,
          400,
          mTextPos + textOffset,
          12,
          "center",
          "black"
        );
        drawTextOnCanvas(
          context,
          meleeWeapons[i].damage,
          440,
          mTextPos + textOffset,
          12,
          "center",
          "black"
        );

        // Check if the Abilities are double long enough to be double spaced/
        if (meleeWeapons[i].ability.length > 28) {
          // Check if we're already double spaced. If we are, we don't need to change the offset.
          if (!isDoubleSpaced) {
            isDoubleSpaced = true;
            height += 20;
          }
          let tempOffset = textOffset;
          const lines = splitTextToLines(28, meleeWeapons[i].ability);
          // If they are, draw them double spaced. .
          for (let i = 0; i < lines.length; i++) {
            drawTextOnCanvas(
              context,
              lines[i],
              550,
              mTextPos + (i + 1) + tempOffset,
              14,
              "center",
              "black"
            );
            tempOffset += 18;
          }
        } else {
          drawTextOnCanvas(
            context,
            meleeWeapons[i].ability,
            550,
            mTextPos + textOffset,
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
        context.drawImage(image, wpnBannerPosX, wpnBannerPosY + imageOffset, width, height);

        /* If we're double spacd, add extra offset, but reduce the height as the next 
        line is assumed to be single space. */
        if (isDoubleSpaced) {
          height -= 20;
          textOffset += 20;
          imageOffset += 20;
          lineCount += 1;
        }
        textOffset += 20;
        imageOffset += 20;
        lineCount += 1;
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

  const triggerDownload = useSelector((state: RootState) => state.warscroll.triggerDownload);

  const factionTemplate = useSelector((state: RootState) => state.faction.factionTemplate);

  const factionWeaponBanner = useSelector((state: RootState) => state.faction.factionWeaponBanner);

  const factionName = useSelector((state: RootState) => state.faction.factionName);

  const warscrollName = useSelector((state: RootState) => state.characteristics.warscrollName);

  const warscrollSubtype = useSelector(
    (state: RootState) => state.characteristics.warscrollSubtype
  );

  const moveChar = useSelector((state: RootState) => state.characteristics.warscrollMove);

  const healthChar = useSelector((state: RootState) => state.characteristics.warscrollHealth);

  const saveChar = useSelector((state: RootState) => state.characteristics.warscrollSave);

  const controlChar = useSelector((state: RootState) => state.characteristics.warscrollControl);

  const keywordIdentities = useSelector((state: RootState) => state.keywords.keywordIdentities);

  const keywordAbilities = useSelector((state: RootState) => state.keywords.keywordAbilities);

  const meleeWeapons = useSelector((state: RootState) => state.weapons.meleeWeaponStats);

  const rangedWeapons = useSelector((state: RootState) => state.weapons.rangedWeaponsStats);

  const abilities = useSelector((state: RootState) => state.abilities.abilities);

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

        // Draw title
        drawWarscrollTitleTextOnCanvas(
          context,
          "• " + factionName.toUpperCase() + " WARSCROLL •",
          warscrollName.toUpperCase(),
          warscrollSubtype.toUpperCase(),
          115
        );
        // Draw characteristics
        drawTextOnCanvas(context, moveChar, 104, 80, charFontSize, "center", "white");
        drawTextOnCanvas(context, controlChar, 104, 147, charFontSize, "center", "white");
        drawTextOnCanvas(context, healthChar, 74, 115, charFontSize, "center", "white");
        drawTextOnCanvas(context, saveChar, 137, 115, charFontSize, "center", "white");

        // Draw Weapons
        drawWeaponsOnCanvas(context, weaponBannerImage, rangedWeapons, meleeWeapons);

        // Draw abilities.
        drawAbilityOnCanvas(context, canvas, abilities);

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
    abilities,
  ]); // This is your dependency. If you want useEffect to rerun, add stuff to this!!

  return (
    <Box
      component="main"
      className="sticky-canvas"
      sx={{
        flexGrow: 2,
        width: 1,
        marginTop: 8,
      }}
    >
      <Container style={{ overflowY: "auto", display: "flex" }}>
        <div style={{ flex: "none", position: "relative" }}>
          <canvas
            ref={canvasRef}
            className="sticky-canvas"
            width={658}
            height={995}
            style={{
              height: "90vh",
              border: "1px solid #000",
              position: "sticky",
              top: "10",
            }}
          />
        </div>
      </Container>
    </Box>
  );
};

export default WarscrollCard;
