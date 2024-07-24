import { RangedWeaponStats } from "../Weapons/RangedWeapons";
import { MeleeWeaponStats } from "../Weapons/MeleeWeapons";
import { Ability } from "../Abilities/Abilities";
import { Coordinate } from "./WarscrollCard";

// Character limits
const warscrollTitleCharPerLine = 20;
const loadoutCharPerLine = 31;
const weaponCharPerLine = 27;

// Font sizes
const wpnBannerFontSize = 13;
const wpnFont = 14;
const loadoutFontSize = 16;
const factionTitleFontSize = 12;
const warscrollNameFontSize = 30;
const abilitiesFont = 10;

// Banner positions
const wpnBannerPosX = 10;
const wpnBannerPosY = 200;
const wpnHeaderYPos = 215;
const textPosY = 232;
const defaultYPos = 242;

// Box visuals
const rectTransparency = 0.5;
//const rectWidth = 105;

export const drawImageOnCanvas = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvas: HTMLCanvasElement
) => {
  ctx.globalAlpha = 1;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};

export const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  alignment: CanvasTextAlign,
  fontColor: string,
  style: string = "" // Default to an empty string if no style is provided
) => {
  ctx.font = `${style} ${fontSize}px "Minion Pro"`;
  ctx.fillStyle = fontColor;
  ctx.textAlign = alignment;
  ctx.globalAlpha = 1;
  ctx.fillText(text, x, y); // Change the coordinates as needed
};

const splitTextToLines = (charLimit: number, text: string): string[] => {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if ((currentLine + word).length <= charLimit) {
      currentLine += " " + word;
      // Fixes a minor bug where the first word of the first line has an extra space
      if (i == 0) {
        currentLine = currentLine.slice(1);
      }
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
};

export const drawLoadoutOnCanvas = (
  ctx: CanvasRenderingContext2D,
  loadoutBody: string,
  loadoutPoints: string[],
  yAnchor: number
) => {
  const xAnchorL = 25;
  ctx.globalAlpha = 1;
  if (loadoutBody.length > 0) {
    if (loadoutBody.length >= loadoutCharPerLine) {
      const lines = splitTextToLines(loadoutCharPerLine, loadoutBody);
      // Draw each line of loadout body
      for (let i = 0; i < lines.length; i++) {
        yAnchor += 20;
        drawText(ctx, lines[i], xAnchorL, yAnchor, loadoutFontSize, "left", "black", "italic");
      }
    }
    // If there is only one line, default to this.
    else {
      yAnchor += 20;
      drawText(ctx, loadoutBody, xAnchorL, yAnchor, loadoutFontSize, "left", "black", "italic");
    }
    // Draw the loadout points
    for (let k = 0; k < loadoutPoints.length; k++) {
      yAnchor += 20;
      drawText(ctx, "•  " + loadoutPoints[k], xAnchorL, yAnchor, loadoutFontSize, "left", "black", "italic");
    }
  }

  return yAnchor; // Return the updated yAnchor
};

const getTextHeight = (
  ctx: CanvasRenderingContext2D,
  stringToSplit: string,
  width: number,
  x: number,
  y: number,
  boxHeight: number,
  drawText: boolean,
  unshift: string = ""
) => {
  let xOffset = x;
  let yOffset = y;
  let lines: string[] = [];
  let heightOffset = 0;
  width += x;

  lines = stringToSplit.split(" ");
  if (unshift) {
    lines.unshift(unshift);
  }
  ctx.fillStyle = "black";
  ctx.textAlign = "left";

  lines.forEach((word, index) => {
    if (index === 0) {
      ctx.font = "bold 14px Minion Pro";
    } else {
      ctx.font = "14px Minion Pro";
    }

    const wordWidth = ctx.measureText(word).width;

    // Check if the x position exceeds the maximum value
    if (xOffset + wordWidth > width) {
      // Move to the next line and reset x position
      yOffset += 15;
      xOffset = x;
      heightOffset += 20;
    }

    if (drawText) {
      ctx.fillText(word, xOffset, yOffset - 5);
    }

    xOffset += wordWidth + ctx.measureText(" ").width;
  });
  heightOffset += 20;
  return heightOffset;
};

export const drawAbilitiesOnCanvas = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  abilities: Ability[],
  coords: Coordinate[],
  isLoadout: boolean
) => {
  const xAnchorL = 25;
  const xAnchorR = canvas.width / 2 + 5;

  const boxWidth = canvas.width / 2 - 40;
  let loadoutOffset = 0; // Offset is used for if we have a loadout, we want to start 1 further in our array
  ctx.globalAlpha = 1;
  console;
  let yOffset = 20;

  if (isLoadout) {
    coords[1].x = xAnchorR;
    coords[1].y += yOffset;
    loadoutOffset += 1;
  } else {
    coords[0].x = xAnchorL;
    coords[0].y += yOffset;
    loadoutOffset + 0;
  }

  // -> Get all the lines for name
  // -> Get all the lines for name description
  // -> Get all the lines for Declare instructions
  // -> Get all the lines for Effect insutrctions
  // -> Multiply the number of lines by some arbitrary value for box size purposes
  // -> Draw the box using that size
  // -> Draw the text.

  // Get the name and description lines.
  for (let i = 0; i < abilities.length; i++) {
    const img = new Image();
    const hasKeywords = abilities[i].keywords.length > 0;
    const k = i + loadoutOffset;
    img.src = abilities[i].ability_banner;
    let boxHeight = 0;
    let bannerHeight = 20;

    img.onload = () => {
      const nameDescCombined = abilities[i]?.name + abilities[i]?.name_desc;
      if (nameDescCombined.length > 0) {
        const offset = getTextHeight(
          ctx,
          abilities[i].name_desc,
          boxWidth,
          coords[k]?.x + 2,
          coords[k]?.y + yOffset,
          boxHeight,
          false,
          abilities[i].name + ": "
        );
        boxHeight += offset;
      }
      if (abilities[i]?.declare_desc.length > 0) {
        const offset = getTextHeight(
          ctx,
          abilities[i]?.declare_desc,
          boxWidth,
          coords[k]?.x + 2,
          coords[k]?.y + yOffset,
          boxHeight,
          false,
          "Declare: "
        );
        boxHeight += offset;
      }

      if (abilities[i]?.effect_desc.length > 0) {
        const offset = getTextHeight(
          ctx,
          abilities[i]?.effect_desc,
          boxWidth,
          coords[k]?.x + 2,
          coords[k]?.y + yOffset,
          boxHeight,
          false,
          "Effect: "
        );
        boxHeight += offset;
      }

      ctx.strokeStyle = abilities[i].ability_line_color;
      ctx.lineWidth = 2;
      // Draw ability top banner
      const abilityTitle = abilities[i].ability_restriction + abilities[i].ability_timing;

      // Draw top banner. We go in order of banner->text for laying purposes.
      if (abilityTitle.length > 0) {
        const titleLines = abilityTitle.split(" ");
        const width = boxWidth + coords[k]?.x;
        let xOffset = coords[k]?.x;
        let yOffset = 0;
        let isDoubleBanner = false;
        ctx.font = "14px Minion Pro";
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        titleLines.forEach((word) => {
          const wordWidth = ctx.measureText(word).width;
          if (xOffset + wordWidth > width) {
            // Move to the next line
            //yOffset -= 20;
            bannerHeight += 20;
            xOffset = coords[k].x;
            isDoubleBanner = true;
          }
          xOffset += wordWidth + ctx.measureText("").width;
        });
        ctx.drawImage(img, coords[k]?.x - 8, coords[k]?.y - bannerHeight, boxWidth + 15, bannerHeight);

        xOffset = coords[k]?.x;
        yOffset = -5;
        titleLines.forEach((word) => {
          const wordWidth = ctx.measureText(word).width;
          if (xOffset + wordWidth > width) {
            // Move to the next line
            yOffset += 15;
            xOffset = coords[k].x;
          }

          if (isDoubleBanner) {
            ctx.fillText(word, xOffset, coords[k].y + yOffset - 17);
          } else {
            ctx.fillText(word, xOffset, coords[k].y + yOffset);
          }

          xOffset += wordWidth + ctx.measureText(" ").width;
        });
      }

      //ctx.globalCompositeOperation = "screen";
      // Draw box interior
      ctx.globalAlpha = rectTransparency;
      ctx.fillStyle = "white";
      ctx.fillRect(coords[k].x, coords[k].y, boxWidth, boxHeight);

      // Draw box exterior
      ctx.globalAlpha = 1;
      ctx.strokeRect(coords[k].x, coords[k].y, boxWidth, boxHeight);

      if (nameDescCombined.length > 0) {
        const name = abilities[i].name + ": ";
        const offset = getTextHeight(
          ctx,
          abilities[i].name_desc,
          boxWidth,
          coords[k]?.x + 2,
          coords[k]?.y + yOffset,
          boxHeight,
          true,
          name
        );
        yOffset += offset;
      }
      console.log("X1: " + abilities[i]?.declare_desc);
      if (abilities[i]?.declare_desc.length > 0) {
        const offset = getTextHeight(
          ctx,
          abilities[i]?.declare_desc,
          boxWidth,
          coords[k]?.x + 2,
          coords[k]?.y + yOffset,
          boxHeight,
          true,
          "Declare: "
        );
        yOffset += offset;
      }

      if (abilities[i]?.effect_desc.length > 0) {
        getTextHeight(
          ctx,
          abilities[i]?.effect_desc,
          boxWidth,
          coords[k]?.x + 2,
          coords[k]?.y + yOffset,
          boxHeight,
          true,
          "Effect: "
        );
      }

      // Draw keyword banners if we have them.
      if (hasKeywords) {
        ctx.strokeRect(coords[k].x, coords[k].y + boxHeight, boxWidth, 19);
        ctx.drawImage(img, coords[k].x - 1, coords[k].y + boxHeight + -1, 80, 21);
        drawText(
          ctx,
          "KEYWORDS",
          coords[k].x + 10,
          coords[k].y + boxHeight + 12,
          abilitiesFont,
          "left",
          "white"
        );
        drawText(
          ctx,
          abilities[i].keywords,
          coords[k].x + 80,
          coords[k].y + boxHeight + 12,
          abilitiesFont,
          "left",
          "black"
        );
      }

      if (k + 1 < abilities.length) {
        const newCoordinate: Coordinate = { x: 0, y: coords[0].y };
        coords.push(newCoordinate);
        if (coords[k].x == xAnchorL) {
          coords[k + 1].x = xAnchorR;
        } else if (coords[k].x == xAnchorR) {
          coords[k + 1].x = xAnchorL;
          coords[k + 1].y += 150;
        }
        yOffset = 20;
      }
    };
  }
};

export const drawWeaponsOnCanvas = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  rangedWeapons: RangedWeaponStats[],
  meleeWeapons: MeleeWeaponStats[]
) => {
  const width = 640;
  let height = 20;
  ctx.globalAlpha = 1;
  let textOffset = 1;
  let imageOffset = 20;
  let mWpnBannerYPos = wpnBannerPosY;
  let lineCount = 1;
  let yAnchor = defaultYPos;
  /* Draw out ranged weapon text */
  if (rangedWeapons.length > 0 || meleeWeapons.length > 0) {
    ctx.drawImage(image, wpnBannerPosX, wpnBannerPosY, width, height);

    // If we have ranged weapons
    if (rangedWeapons.length > 0) {
      /* If we have ranged weapons, increment the melee weapon value so if we
          add melee weapons, they'll position corrctly. */
      drawText(ctx, "RANGED WEAPONS", 110, wpnHeaderYPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Rng", 240, wpnHeaderYPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Atk", 280, wpnHeaderYPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Hit", 320, wpnHeaderYPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Wnd", 360, wpnHeaderYPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Rnd", 400, wpnHeaderYPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Dmg", 440, wpnHeaderYPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Ability", 550, wpnHeaderYPos, wpnBannerFontSize, "center", "white");

      for (let i = 0; i < rangedWeapons.length; i++) {
        let isDoubleSpaced = false;
        // Check if the Name is long enough to be double spaced/
        if (rangedWeapons[i].name.length > weaponCharPerLine) {
          isDoubleSpaced = true;
          height += 20;
          const lines = splitTextToLines(weaponCharPerLine, rangedWeapons[i].name);
          // If they are, draw them double spaced.
          let tempOffset = textOffset;
          for (let i = 0; i < lines.length; i++) {
            drawText(ctx, lines[i], 111, textPosY + tempOffset, wpnFont, "center", "black");
            tempOffset += 18;
          }
          //
        } else {
          drawText(ctx, rangedWeapons[i].name, 111, textPosY + textOffset, wpnFont, "center", "black");
        }
        drawText(ctx, rangedWeapons[i].range, 240, textPosY + textOffset, wpnFont, "center", "black");
        drawText(ctx, rangedWeapons[i].atk, 280, textPosY + textOffset, wpnFont, "center", "black");
        drawText(ctx, rangedWeapons[i].toHit, 320, textPosY + textOffset, wpnFont, "center", "black");
        drawText(ctx, rangedWeapons[i].toWound, 360, textPosY + textOffset, wpnFont, "center", "black");
        drawText(ctx, rangedWeapons[i].rend, 400, textPosY + textOffset, wpnFont, "center", "black");
        drawText(ctx, rangedWeapons[i].damage, 440, textPosY + textOffset, wpnFont, "center", "black");

        // Check if the Abilities are double long enough to be double spaced/
        if (rangedWeapons[i].ability.length > weaponCharPerLine) {
          // Check if we're already double spaced. If we are, we don't need to change the offset.
          if (!isDoubleSpaced) {
            isDoubleSpaced = true;
            height += 20;
          }

          const lines = splitTextToLines(weaponCharPerLine, rangedWeapons[i].ability);
          let tempOffset = textOffset;
          // If they are, draw them double spaced. .
          for (let i = 0; i < lines.length; i++) {
            drawText(ctx, lines[i], 550, textPosY + tempOffset, wpnFont, "center", "black");
            tempOffset += 18;
          }
          //
        } else {
          drawText(ctx, rangedWeapons[i].ability, 550, textPosY + textOffset, wpnFont, "center", "black");
        }
        // Check if odd or even. Odd means fully transparent, even means partially
        if (i % 2 === 0) {
          ctx.globalAlpha = 0.1;
        } else {
          ctx.globalAlpha = 0.3;
        }

        // Finally, draw our image
        ctx.drawImage(image, wpnBannerPosX, wpnBannerPosY + imageOffset, width, height);

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
        yAnchor += textOffset;
      }
    }
    // If we have melee weapons
    if (meleeWeapons.length > 0) {
      let mBannerTextPos = wpnHeaderYPos;
      let mTextPos = wpnHeaderYPos;
      textOffset = 0;
      // If we have ranged weapon, increment the text by the current line count.
      if (rangedWeapons.length > 0) {
        mWpnBannerYPos += 20 * lineCount;
        mBannerTextPos += 20 * lineCount;
        mTextPos += 20 * lineCount;
        imageOffset += 20;
      }
      mTextPos += 20;
      ctx.globalAlpha = 1;
      ctx.drawImage(image, wpnBannerPosX, mWpnBannerYPos, width, height);

      // Draw Melee Header Text
      drawText(ctx, "MELEE WEAPONS", 110, mBannerTextPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Atk", 280, mBannerTextPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Hit", 320, mBannerTextPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Wnd", 360, mBannerTextPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Rnd", 400, mBannerTextPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Dmg", 440, mBannerTextPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Ability", 550, mBannerTextPos, wpnBannerFontSize, "center", "white");

      for (let i = 0; i < meleeWeapons.length; i++) {
        let isDoubleSpaced = false;
        // Check if the Name is long enough to be double spaced/
        if (meleeWeapons[i].name.length > weaponCharPerLine) {
          isDoubleSpaced = true;
          height += 20;
          const lines = splitTextToLines(weaponCharPerLine, meleeWeapons[i].name);
          // If they are, draw them double spaced.
          let tempOffset = textOffset;
          for (let i = 0; i < lines.length; i++) {
            drawText(ctx, lines[i], 111, mTextPos + (i + 2) + tempOffset, wpnFont, "center", "black");
            tempOffset += 18;
          }
          //
        } else {
          drawText(ctx, meleeWeapons[i].name, 111, mTextPos + textOffset, wpnFont, "center", "black");
        }
        drawText(ctx, meleeWeapons[i].atk, 280, mTextPos + textOffset, wpnFont, "center", "black");
        drawText(ctx, meleeWeapons[i].toHit, 320, mTextPos + textOffset, wpnFont, "center", "black");
        drawText(ctx, meleeWeapons[i].toWound, 360, mTextPos + textOffset, wpnFont, "center", "black");
        drawText(ctx, meleeWeapons[i].rend, 400, mTextPos + textOffset, wpnFont, "center", "black");
        drawText(ctx, meleeWeapons[i].damage, 440, mTextPos + textOffset, wpnFont, "center", "black");

        // Check if the Abilities are double long enough to be double spaced/
        if (meleeWeapons[i].ability.length > weaponCharPerLine) {
          // Check if we're already double spaced. If we are, we don't need to change the offset.
          if (!isDoubleSpaced) {
            isDoubleSpaced = true;
            height += 20;
          }
          let tempOffset = textOffset;
          const lines = splitTextToLines(weaponCharPerLine, meleeWeapons[i].ability);
          // If they are, draw them double spaced. .
          for (let i = 0; i < lines.length; i++) {
            drawText(ctx, lines[i], 550, mTextPos + (i + 1) + tempOffset, wpnFont, "center", "black");
            tempOffset += 18;
          }
        } else {
          drawText(ctx, meleeWeapons[i].ability, 550, mTextPos + textOffset, wpnFont, "center", "black");
        }
        // Check if odd or even. Odd means fully transparent, even means partially
        if (i % 2 === 0) {
          ctx.globalAlpha = 0.1;
        } else {
          ctx.globalAlpha = 0.3;
        }
        // Finally, draw our image
        ctx.drawImage(image, wpnBannerPosX, wpnBannerPosY + imageOffset, width, height);

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
    yAnchor = imageOffset + wpnBannerPosY;
  }
  return yAnchor; // Return the updated yAnchor
};

export const drawWarscrollTitleTextOnCanvas = (
  ctx: CanvasRenderingContext2D,
  factionText: string,
  warscrollName: string,
  subtitle: string,
  y: number
) => {
  const offset = 75;
  const x = ctx.canvas.width / 2 + offset;
  ctx.textAlign = "center";
  ctx.globalAlpha = 1;
  ctx.font = warscrollNameFontSize.toString() + "px Minion Pro";
  ctx.fillStyle = "white";

  if (warscrollName.length >= warscrollTitleCharPerLine) {
    const lines = splitTextToLines(warscrollTitleCharPerLine, warscrollName);
    // Draw each line of warscrollName
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, y - 10 + i * warscrollNameFontSize);
    }
    ctx.font = factionTitleFontSize.toString() + "px Minion Pro Bold";
    ctx.fillText(subtitle, x, y + 40);
    ctx.fillText(factionText, x, y - 45);
  }
  // If there is only one line, default to this.
  else {
    ctx.fillText(warscrollName, x, y);
    ctx.font = factionTitleFontSize.toString() + "px Minion Pro Bold";
    ctx.fillText(subtitle, x, y + 20);
    ctx.fillText(factionText, x, y - 35);
  }
};
