import { RangedWeaponOverrideStats, RangedWeaponStats } from "../Weapons/RangedWeapons";
import { MeleeWeaponOverrideStats, MeleeWeaponStats } from "../Weapons/MeleeWeapons";
import { Ability } from "../Abilities/Abilities";
import { Coordinate } from "./WarscrollCard";
import { AbilityIconPath, AbilityTypeIcon, defaultAbilityIconWidthHeight } from "../Abilities/AbilitiesInfo";

// Character limits and offeets
const weaponCharPerLine = 27;
const abilityIconOffset = 17;

// Font sizes
const wpnBannerFontSize = 13;
const wpnFont = 14;
const factionTitleFontSize = 12;
const warscrollNameFontSize = 28;
const abilitiesFont = 12;
const abilityTypeFontSize = 16;

// Banner positions
const wpnBannerPosX = 10;
const wpnBannerPosY = 200;
const wpnHeaderYPos = 215;
const textPosY = 230;
const defaultYPos = 242;

// Weapon Text Draw positions
const rng = 240;
const atk = 280;
const hit = 320;
const wnd = 360;
const rnd = 400;
const dmg = 440;

// Box visuals
const rectTransparency = 0.5;

// Default anchors
const xAnchorL = 25;

export const validateDiceInput = (value: string): boolean => {
  const numberPattern = /^[d]?[1-9]?[0-9]?$/i;
  const diceNumberPattern = /^[1-9]?[0-9]?[d]?[1-9]?[+-]?[1-9]?$/i;
  const dicePattern = /^[d]?[1-9]?[+]?[1-9]?$/i;
  return numberPattern.test(value) || diceNumberPattern.test(value) || dicePattern.test(value);
};

export const validateNumericInput = (value: string): boolean => {
  const numberPattern = /^[1-9][0-9]?$/;
  return numberPattern.test(value);
};

export const drawImageOnCanvas = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  x: number = 0,
  y: number = 0,
  width: number = canvas.width,
  height: number = canvas.height
) => {
  ctx.globalAlpha = 1;
  ctx.drawImage(image, x, y, width, height);
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
  yAnchor: number,
  maxWidth: number
) => {
  let xOffset = xAnchorL;
  let yOffset = yAnchor + 20;
  ctx.globalAlpha = 1;
  ctx.fillStyle = "black";
  ctx.textAlign = "left";
  ctx.font = "bold italic 14px Minion Pro";
  const doubleLineXOffset = 12;
  if (loadoutBody.length > 0) {
    const lines = loadoutBody.split(" ");

    lines.forEach((word) => {
      const wordWidth = ctx.measureText(word).width;
      if (wordWidth + xOffset > maxWidth) {
        yOffset += 15;
        xOffset = xAnchorL;
      }

      ctx.fillText(word, xOffset, yOffset);
      xOffset += wordWidth + ctx.measureText(" ").width;
    });
  }

  // Draw the loadout points.
  if (loadoutPoints.length > 0) {
    yOffset += 5; // Adds a little margin between the body and points.
    for (let i = 0; i < loadoutPoints.length; i++) {
      xOffset = xAnchorL;
      yOffset += 15;
      const lines = loadoutPoints[i].split(" ");
      lines.forEach((word, index) => {
        if (index === 0) {
          word = "•  " + word;
        }
        const wordWidth = ctx.measureText(word).width;
        if (wordWidth + xOffset > maxWidth) {
          yOffset += 15;
          xOffset = xAnchorL + doubleLineXOffset;
        }
        ctx.fillText(word, xOffset, yOffset);
        xOffset += wordWidth + ctx.measureText(" ").width;
      });
    }
  }

  return yOffset - 120; // Return the updated yAnchor
};

const getTextHeight = (
  ctx: CanvasRenderingContext2D,
  stringToSplit: string,
  width: number,
  x: number,
  y: number,
  drawText: boolean,
  unshift: string = "",
  fontSize: number = 14,
  alignment: CanvasTextAlign = "left",
  fontColor: string = "black",
  style: string = "" // Default to an empty string if no style is provided
) => {
  let xOffset = x;
  let yOffset = y;
  let heightOffset = 7;
  width += x;

  // Split the string into lines based on newline characters

  const lines = stringToSplit.split("\n");
  if (unshift) {
    lines[0] = unshift + lines[0];
  }

  ctx.fillStyle = fontColor;
  ctx.textAlign = alignment;

  lines.forEach((line, lineIndex) => {
    // Split each line into words
    const words = line.split(" ");

    words.forEach((word, wordIndex) => {
      if (lineIndex === 0 && wordIndex + 1 < unshift.split(" ").length) {
        ctx.font = "bold 14px Minion Pro";
      } else {
        ctx.font = `${style} ${fontSize}px "Minion Pro"`;
        ctx.fillStyle = fontColor;
        ctx.textAlign = alignment;
        ctx.globalAlpha = 1;
      }

      const wordWidth = ctx.measureText(word).width;
      // Check if the x position exceeds the maximum value
      if (xOffset + wordWidth > width) {
        // Move to the next line and reset x position
        yOffset += fontSize;
        xOffset = x;
        heightOffset += fontSize;
      }

      if (drawText) {
        ctx.fillText(word, xOffset, yOffset);
      }

      xOffset += wordWidth + ctx.measureText(" ").width;
    });

    // Move to the next line after processing each line
    yOffset += fontSize;
    xOffset = x;
    heightOffset += fontSize;
  });
  console.log("Height offset: " + heightOffset);
  return heightOffset;
};

export const drawAbilitiesOnCanvas = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  abilities: Ability[],
  coords: Coordinate[],
  isLoadout: boolean,
  numOfLoadoutPoints: number
) => {
  const xAnchorR = canvas.width / 2 + 10;
  const xAnchorL = 20;

  const boxWidth = canvas.width / 2 - 40;
  let loadoutOffset = 0; // Offset is used for if we have a loadout, we want to start 1 further in our array
  ctx.globalAlpha = 1;
  let yOffset = 20;

  if (isLoadout) {
    coords[0].x = xAnchorL;
    loadoutOffset = coords[0].y;
    coords[0].y += yOffset + 120;
    if (numOfLoadoutPoints > 0) {
      for (let q = 0; q < numOfLoadoutPoints; q++) {
        loadoutOffset -= 15;
      }
    }
  } else {
    coords[0].x = xAnchorL;
    coords[0].y += yOffset;
  }

  const loadImages = abilities.map((ability) => {
    return new Promise<void>((resolve) => {
      const imgBanneer = new Image();
      imgBanneer.src = ability.ability_banner;
      imgBanneer.onload = () => resolve();
    });
  });

  const boxHeightArr = new Array(abilities.length).fill(0); // Used to store ability card height.
  Promise.all(loadImages).then(() => {
    for (let i = 0; i < abilities.length; i++) {
      const img = new Image();
      const hasKeywords = abilities[i].keywords.length > 0;
      img.src = abilities[i].ability_banner;

      img.onload = () => {
        const xCoord = coords[i]?.x;
        const yCoord = coords[i]?.y;
        const abilityTitle = abilities[i].ability_restriction + abilities[i].ability_timing;

        let bannerHeight = 20;
        let tempAbilityIconOffset = abilityIconOffset;
        let boxHeight = 0;
        let isDoubleBanner = false;

        if (abilityTitle.length > 0) {
          const titleLines = abilityTitle.split(" ");
          const width = boxWidth + xCoord;
          let xOffset = xCoord;
          let yTempOffset = 0;

          ctx.font = "14px Minion Pro";
          ctx.fillStyle = "white";
          ctx.textAlign = "left";
          titleLines.forEach((word) => {
            const wordWidth = ctx.measureText(word).width;
            if (xOffset + wordWidth > width - tempAbilityIconOffset) {
              bannerHeight += 16;
              xOffset = xCoord;
              isDoubleBanner = true;
              tempAbilityIconOffset = 0;
            }
            xOffset += wordWidth + ctx.measureText(" ").width;
          });
          ctx.drawImage(img, xCoord - 8, yCoord, boxWidth + 15, bannerHeight);

          xOffset = xCoord;
          yTempOffset = -5;
          tempAbilityIconOffset = abilityIconOffset;
          titleLines.forEach((word) => {
            const wordWidth = ctx.measureText(word).width;
            if (xOffset + wordWidth > width - tempAbilityIconOffset) {
              yTempOffset += 15;
              xOffset = coords[i].x;
              tempAbilityIconOffset = 0;
            }
            if (isDoubleBanner) {
              ctx.fillText(word, xOffset + tempAbilityIconOffset, yCoord + 40 + yTempOffset - 17);
            } else {
              ctx.fillText(word, xOffset + tempAbilityIconOffset, yCoord + 15);
            }
            xOffset += wordWidth + ctx.measureText(" ").width;
          });
          yOffset += bannerHeight;

          // Now draw the ability icon
          const iconPath = abilities[i].ability_icon_path;
          const iconImg = new Image();
          iconImg.src = iconPath;

          iconImg.onload = () => {
            ctx.drawImage(iconImg, xCoord - 3, yCoord + 2, 17, 17);
          };
        }

        const nameDescCombined = abilities[i]?.name.toUpperCase() + abilities[i]?.name_desc;
        if (nameDescCombined.length > 0) {
          console.log("Hellwofowfwe");
          const offset = getTextHeight(
            ctx,
            abilities[i].name_desc,
            boxWidth,
            xCoord + 2,
            yCoord + yOffset,
            false,
            abilities[i].name.toUpperCase() + ": ",
            14,
            "left",
            "black",
            "italic"
          );
          console.log("Offset: " + offset);
          boxHeight += offset;
        }
        if (abilities[i]?.declare_desc.length > 0) {
          const offset = getTextHeight(
            ctx,
            abilities[i]?.declare_desc,
            boxWidth,
            xCoord + 2,
            yCoord + yOffset,
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
            xCoord + 2,
            yCoord + yOffset,
            false,
            "Effect: "
          );
          boxHeight += offset;
        }

        ctx.strokeStyle = abilities[i].ability_line_color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = rectTransparency;
        ctx.fillStyle = "white";
        const rPadding = 10;
        const lPadding = 5;
        const bPadding = 5;
        ctx.fillRect(xCoord - lPadding, yCoord + yOffset - 20, boxWidth + rPadding, boxHeight + bPadding);
        ctx.globalAlpha = 1;
        ctx.strokeRect(xCoord - lPadding, yCoord + yOffset - 20, boxWidth + rPadding, boxHeight + 5);

        // Draw the ability description
        if (nameDescCombined.length > 0) {
          const name = abilities[i].name + ": ";
          const offset = getTextHeight(
            ctx,
            abilities[i].name_desc,
            boxWidth,
            xCoord + 2,
            yCoord + yOffset,
            true,
            name.toUpperCase(),
            14,
            "left",
            "black",
            "italic"
          );
          yOffset += offset;
        }
        if (abilities[i]?.declare_desc.length > 0) {
          const offset = getTextHeight(
            ctx,
            abilities[i]?.declare_desc,
            boxWidth,
            xCoord + 2,
            yCoord + yOffset - 3,
            true,
            "Declare: "
          );
          yOffset += offset;
        }
        if (abilities[i]?.effect_desc.length > 0) {
          const offset = getTextHeight(
            ctx,
            abilities[i]?.effect_desc,
            boxWidth,
            xCoord + 2,
            yCoord + yOffset - 3,
            true,
            "Effect: "
          );
          yOffset += offset - 20;
        }

        // Handle the ability type icon
        const iconTypePath = abilities[i].ability_icon_type_path;
        if (
          iconTypePath === AbilityTypeIcon.command ||
          iconTypePath === AbilityTypeIcon.prayer ||
          iconTypePath === AbilityTypeIcon.spell
        ) {
          const iconTypeImg = new Image();
          iconTypeImg.src = iconTypePath;

          iconTypeImg.onload = () => {
            ctx.drawImage(iconTypeImg, xCoord + boxWidth - 15, yCoord - 8, 35, 35);
            let fontColor = "";
            if (iconTypePath === AbilityTypeIcon.command) {
              fontColor = "black";
            } else {
              fontColor = "white";
            }
            drawText(
              ctx,
              abilities[i].ability_type_value,
              xCoord + boxWidth + 2,
              yCoord + 15,
              abilityTypeFontSize,
              "center",
              fontColor,
              "bold"
            );
          };
        }

        if (hasKeywords) {
          boxHeight += bannerHeight;
          ctx.strokeRect(xCoord - lPadding, yCoord + boxHeight + bPadding, boxWidth + rPadding, 19);
          ctx.globalAlpha = rectTransparency;
          ctx.fillStyle = "white";
          ctx.fillRect(xCoord - lPadding, yCoord + boxHeight + bPadding, boxWidth + rPadding, 19);
          ctx.globalAlpha = 1.0;
          ctx.drawImage(img, xCoord - 1 - lPadding, yCoord + boxHeight - 1 + bPadding, 80, 21);
          drawText(
            ctx,
            "KEYWORDS",
            xCoord + 5 - lPadding,
            yCoord + boxHeight + 14 + bPadding,
            abilitiesFont,
            "left",
            "white"
          );
          drawText(
            ctx,
            abilities[i].keywords,
            xCoord + 81 - lPadding,
            yCoord + boxHeight + 14 + bPadding,
            abilitiesFont,
            "left",
            "black"
          );
        }

        ctx.save();

        if (isDoubleBanner) {
          boxHeightArr[i] = boxHeight + 55;
        } else {
          boxHeightArr[i] = boxHeight + 35;
        }

        if (i + 1 < abilities.length) {
          const newCoordinate: Coordinate = { x: 0, y: coords[0].y };
          coords.push(newCoordinate);
          if (xCoord === xAnchorL) {
            if (i === 0) {
              coords[i + 1].x = xAnchorR;
              if (isLoadout) {
                coords[i + 1].y = loadoutOffset + 110;
              } else coords[i + 1].y = coords[i]?.y;
            } else {
              coords[i + 1].x = xAnchorR;
              coords[i + 1].y = coords[i - 1]?.y + boxHeightArr[i - 1];
            }
          } else if (xCoord === xAnchorR) {
            coords[i + 1].x = xAnchorL;
            coords[i + 1].y = coords[i - 1]?.y + boxHeightArr[i - 1];
          }
          yOffset = 20;
        }
      };
    }
  });
};

const drawBattleDamagedWeaponIcon = (
  ctx: CanvasRenderingContext2D,
  battleDamagdIconPath: string,
  x: number,
  y: number
) => {
  const iconPath = battleDamagdIconPath;
  const iconImg = new Image();
  iconImg.src = iconPath;
  iconImg.onload = () => {
    ctx.drawImage(iconImg, x + 1, y + 1, defaultAbilityIconWidthHeight, defaultAbilityIconWidthHeight);
  };
};

const checkLineCount = (currentLineCount: number, tempLineCount: number) => {
  if (tempLineCount > currentLineCount) {
    return tempLineCount;
  } else {
    return currentLineCount;
  }
};

const drawLine = (
  ctx: CanvasRenderingContext2D,
  xStartPoint: number,
  yStartPoint: number,
  xEndPoint: number,
  yEndPoint: number
) => {
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(xStartPoint, yStartPoint);
  ctx.lineTo(xEndPoint, yEndPoint);
  ctx.stroke();
};

export const drawWeaponsOnCanvas = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  rangedWeapons: RangedWeaponStats[],
  meleeWeapons: MeleeWeaponStats[]
) => {
  const width = 640;
  const height = 18;
  ctx.globalAlpha = 1;
  let textOffset = 1;
  let imageOffset = 18;
  let mWpnBannerYPos = wpnBannerPosY;
  let lineCount = 1;
  let tempLineCount = 0;
  let currentWpnLineCount = 1;
  let yAnchor = defaultYPos;

  /* Draw out ranged weapon text */
  if (rangedWeapons.length > 0 || meleeWeapons.length > 0) {
    ctx.drawImage(image, wpnBannerPosX, wpnBannerPosY, width, height);

    if (rangedWeapons.length > 0) {
      drawText(ctx, "RANGED WEAPONS", 110, wpnHeaderYPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Rng", 240, wpnHeaderYPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Atk", 280, wpnHeaderYPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Hit", 320, wpnHeaderYPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Wnd", 360, wpnHeaderYPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Rnd", 400, wpnHeaderYPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Dmg", 440, wpnHeaderYPos, wpnBannerFontSize, "center", "white");
      drawText(ctx, "Ability", 550, wpnHeaderYPos, wpnBannerFontSize, "center", "white");

      for (let i = 0; i < rangedWeapons.length; i++) {
        if (rangedWeapons[i].name.length > weaponCharPerLine) {
          const lines = splitTextToLines(weaponCharPerLine, rangedWeapons[i].name);
          let tempOffset = textOffset;
          for (let i = 0; i < lines.length; i++) {
            drawText(ctx, lines[i], 120, textPosY + tempOffset, wpnFont, "center", "black");
            tempOffset += 17;
            tempLineCount += 1;
          }
          currentWpnLineCount = checkLineCount(currentWpnLineCount, tempLineCount);
          tempLineCount = 0;
        } else {
          drawText(ctx, rangedWeapons[i].name, 120, textPosY + textOffset, wpnFont, "center", "black");
        }

        // Draw weapon Override if there is one
        if (rangedWeapons[i].isOverride && rangedWeapons[i].override?.length) {
          const override = rangedWeapons[i].override[0];

          if (override != null) {
            const keys = Object.keys(override) as Array<keyof RangedWeaponOverrideStats>;
            let firstTrueKey: keyof RangedWeaponOverrideStats | null = null;
            let lastTrueKey: keyof RangedWeaponOverrideStats | null = null;
            for (const key of keys) {
              if (override[key] === true) {
                if (firstTrueKey === null) {
                  firstTrueKey = key; // Found the first true value
                }
                lastTrueKey = key; // Update last true value
              }
            }

            let drawTextLeft = 0;
            let drawTextCenter = 0;
            let drawTextRight = 0;

            if (firstTrueKey !== null && lastTrueKey !== null) {
              // Define the order of keys and their corresponding values
              const keyOrder: Array<keyof RangedWeaponOverrideStats> = [
                "range",
                "atk",
                "toHit",
                "toWound",
                "rend",
                "damage",
              ];
              const valueMap: Record<keyof RangedWeaponOverrideStats, number> = {
                range: rng,
                atk: atk,
                toHit: hit,
                toWound: wnd,
                rend: rnd,
                damage: dmg,
              };

              // Find the indexes of the first and last true keys
              const firstIndex = keyOrder.indexOf(firstTrueKey);
              const lastIndex = keyOrder.indexOf(lastTrueKey);

              // Loop through the keys and decide whether to draw text
              for (let statIndex = 0; statIndex <= keyOrder.length; statIndex++) {
                const key = keyOrder[statIndex];
                const value = valueMap[key];
                if (statIndex < firstIndex || statIndex > lastIndex) {

                  // add the inches quote mark to attack range
                  let rangedWeaponStatValue = rangedWeapons[i][key]
                  if (statIndex === 0) {
                    rangedWeaponStatValue = rangedWeaponStatValue + '"'
                  } 

                  drawText(
                    ctx,
                    rangedWeaponStatValue,
                    value,
                    textPosY + textOffset,
                    wpnFont,
                    "center",
                    "black"
                  );
                }

                // Set the positions for the center and right text
                if (statIndex === firstIndex) {
                  drawTextLeft = value;
                  drawTextCenter = drawTextLeft;
                } else if (statIndex === lastIndex) {
                  drawTextRight = value;
                  drawTextCenter = (drawTextLeft + drawTextRight) / 2;
                }
              }
              if (firstIndex === lastIndex) {
                // If there is only one value
                drawText(ctx, "*", drawTextCenter, textPosY + textOffset, wpnFont, "center", "black");
              } else if (lastIndex - firstIndex === 1) {
                // If there are only two true values.
                drawText(ctx, "See Below", drawTextCenter, textPosY + textOffset, wpnFont, "center", "black");
              } else {
                // Draw left path
                drawLine(
                  ctx,
                  drawTextCenter - 35,
                  textPosY + textOffset - 5,
                  drawTextLeft - 10,
                  textPosY + textOffset - 5
                );
                drawLine(
                  ctx,
                  drawTextLeft - 10,
                  textPosY + textOffset - 8,
                  drawTextLeft - 10,
                  textPosY + textOffset - 2
                );
                drawText(ctx, "See Below", drawTextCenter, textPosY + textOffset, wpnFont, "center", "black");
                // Draw right path
                drawLine(
                  ctx,
                  drawTextCenter + 35,
                  textPosY + textOffset - 5,
                  drawTextRight + 10,
                  textPosY + textOffset - 5
                );
                drawLine(
                  ctx,
                  drawTextRight + 10,
                  textPosY + textOffset - 8,
                  drawTextRight + 10,
                  textPosY + textOffset - 2
                );
              }
            }
          }
        } else {
          // If not override, draw weapons normally.
          drawText(ctx, rangedWeapons[i].range + '"', rng, textPosY + textOffset, wpnFont, "center", "black");
          drawText(ctx, rangedWeapons[i].atk, atk, textPosY + textOffset, wpnFont, "center", "black");
          drawText(ctx, rangedWeapons[i].toHit, hit, textPosY + textOffset, wpnFont, "center", "black");
          drawText(ctx, rangedWeapons[i].toWound, wnd, textPosY + textOffset, wpnFont, "center", "black");
          drawText(ctx, rangedWeapons[i].rend, rnd, textPosY + textOffset, wpnFont, "center", "black");
          drawText(ctx, rangedWeapons[i].damage, dmg, textPosY + textOffset, wpnFont, "center", "black");
        }

        // Check if the Abilities are double long enough to be extra spaced/
        if (rangedWeapons[i].ability.length > weaponCharPerLine) {
          const lines = splitTextToLines(weaponCharPerLine, rangedWeapons[i].ability);
          let tempOffset = textOffset;
          // If they are, draw them double spaced. .
          for (let i = 0; i < lines.length; i++) {
            drawText(ctx, lines[i], 550, textPosY + tempOffset, wpnFont, "center", "black");
            tempOffset += 17;
            tempLineCount += 1;
          }
          currentWpnLineCount = checkLineCount(currentWpnLineCount, tempLineCount);
          tempLineCount = 0;
        } else {
          drawText(ctx, rangedWeapons[i].ability, 550, textPosY + textOffset, wpnFont, "center", "black");
        }

        // If the ranged weapon ability is empty, draw a '-'
        if (rangedWeapons[i].ability.length === 0) {
          drawText(ctx, "-", 550, textPosY + textOffset, wpnFont, "center", "black");
        }
        // Check if odd or even. Odd means fully transparent, even means partially
        if (i % 2 === 0) {
          ctx.globalAlpha = 0.1;
        } else {
          ctx.globalAlpha = 0.3;
        }

        // Finally, draw our image
        ctx.drawImage(image, wpnBannerPosX, wpnBannerPosY + imageOffset, width, height * currentWpnLineCount);

        // If we have a battle damaged weapon, add battle damage icon
        if (rangedWeapons[i].isBattleDamaged) {
          drawBattleDamagedWeaponIcon(
            ctx,
            AbilityIconPath.battleDamagedWeaponPath,
            wpnBannerPosX,
            wpnBannerPosY + imageOffset
          );
        }
        textOffset += 18 * currentWpnLineCount;
        imageOffset = imageOffset + 18 * currentWpnLineCount;
        yAnchor += textOffset;
        lineCount += currentWpnLineCount;
        tempLineCount = 0;
        currentWpnLineCount = 1;
      }
    }
    // If we have melee weapons
    if (meleeWeapons.length > 0) {
      let mBannerTextPos = wpnHeaderYPos;
      let mTextPos = wpnHeaderYPos;
      textOffset = 0;

      // If we have ranged weapon, increment the text by the current line count.
      if (rangedWeapons.length > 0) {
        mWpnBannerYPos += 18 * lineCount;
        mBannerTextPos += 18 * lineCount;
        mTextPos += 18 * lineCount;
        imageOffset += 18;
      }
      mTextPos += 18;
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
        // Draw weapon name
        if (meleeWeapons[i].name.length > weaponCharPerLine) {
          const lines = splitTextToLines(weaponCharPerLine, meleeWeapons[i].name);
          let tempOffset = textOffset;
          for (let i = 0; i < lines.length; i++) {
            drawText(ctx, lines[i], 120, mTextPos + tempOffset, wpnFont, "center", "black");
            tempOffset += 18;
            tempLineCount += 1;
          }
          currentWpnLineCount = checkLineCount(currentWpnLineCount, tempLineCount);
          tempLineCount = 0;
        } else {
          drawText(ctx, meleeWeapons[i].name, 120, mTextPos + textOffset, wpnFont, "center", "black");
        }

        // Draw weapon Override if there is one
        if (meleeWeapons[i].isOverride && meleeWeapons[i].override?.length) {
          const override = meleeWeapons[i].override[0];

          if (override != null) {
            const keys = Object.keys(override) as Array<keyof MeleeWeaponOverrideStats>;
            let firstTrueKey: keyof MeleeWeaponOverrideStats | null = null;
            let lastTrueKey: keyof MeleeWeaponOverrideStats | null = null;
            for (const key of keys) {
              if (override[key] === true) {
                if (firstTrueKey === null) {
                  firstTrueKey = key; // Found the first true value
                }
                lastTrueKey = key; // Update last true value
              }
            }

            let drawTextLeft = 0;
            let drawTextCenter = 0;
            let drawTextRight = 0;

            if (firstTrueKey !== null && lastTrueKey !== null) {
              // Define the order of keys and their corresponding values
              const keyOrder: Array<keyof MeleeWeaponOverrideStats> = [
                "atk",
                "toHit",
                "toWound",
                "rend",
                "damage",
              ];
              const valueMap: Record<keyof MeleeWeaponOverrideStats, number> = {
                atk,
                toHit: hit,
                toWound: wnd,
                rend: rnd,
                damage: dmg,
              };

              // Find the indexes of the first and last true keys
              const firstIndex = keyOrder.indexOf(firstTrueKey);
              const lastIndex = keyOrder.indexOf(lastTrueKey);

              // Loop through the keys and decide whether to draw text
              for (let j = 0; j <= keyOrder.length; j++) {
                const key = keyOrder[j];
                const value = valueMap[key];

                if (j < firstIndex || j > lastIndex) {
                  drawText(
                    ctx,
                    meleeWeapons[i][key],
                    value,
                    mTextPos + textOffset,
                    wpnFont,
                    "center",
                    "black"
                  );
                }

                // Set the positions for the center and right text
                if (j === firstIndex) {
                  drawTextLeft = value;
                  drawTextCenter = drawTextLeft;
                } else if (j === lastIndex) {
                  drawTextRight = value;
                  drawTextCenter = (drawTextLeft + drawTextRight) / 2;
                }
              }
              if (firstIndex === lastIndex) {
                // If there is only one value
                drawText(ctx, "*", drawTextCenter, mTextPos + textOffset, wpnFont, "center", "black");
              } else if (lastIndex - firstIndex === 1) {
                // If there are only two true values.
                drawText(ctx, "See Below", drawTextCenter, mTextPos + textOffset, wpnFont, "center", "black");
              } else {
                // Draw left path
                drawLine(
                  ctx,
                  drawTextCenter - 35,
                  mTextPos + textOffset - 5,
                  drawTextLeft - 10,
                  mTextPos + textOffset - 5
                );
                drawLine(
                  ctx,
                  drawTextLeft - 10,
                  mTextPos + textOffset - 8,
                  drawTextLeft - 10,
                  mTextPos + textOffset - 2
                );
                drawText(ctx, "See Below", drawTextCenter, mTextPos + textOffset, wpnFont, "center", "black");
                // Draw right path
                drawLine(
                  ctx,
                  drawTextCenter + 35,
                  mTextPos + textOffset - 5,
                  drawTextRight + 10,
                  mTextPos + textOffset - 5
                );
                drawLine(
                  ctx,
                  drawTextRight + 10,
                  mTextPos + textOffset - 8,
                  drawTextRight + 10,
                  mTextPos + textOffset - 2
                );
              }
            }
          }
        } else {
          // If not override, draw weapons normally.
          drawText(ctx, meleeWeapons[i].atk, atk, mTextPos + textOffset, wpnFont, "center", "black");
          drawText(ctx, meleeWeapons[i].toHit, hit, mTextPos + textOffset, wpnFont, "center", "black");
          drawText(ctx, meleeWeapons[i].toWound, wnd, mTextPos + textOffset, wpnFont, "center", "black");
          drawText(ctx, meleeWeapons[i].rend, rnd, mTextPos + textOffset, wpnFont, "center", "black");
          drawText(ctx, meleeWeapons[i].damage, dmg, mTextPos + textOffset, wpnFont, "center", "black");
        }

        // Draw weapon abilities
        if (meleeWeapons[i].ability.length > weaponCharPerLine) {
          const lines = splitTextToLines(weaponCharPerLine, meleeWeapons[i].ability);
          let tempOffset = textOffset;
          for (let i = 0; i < lines.length; i++) {
            drawText(ctx, lines[i], 550, mTextPos + tempOffset, wpnFont, "center", "black");
            tempOffset += 17;
            tempLineCount += 1;
          }
          currentWpnLineCount = checkLineCount(currentWpnLineCount, tempLineCount);
          tempLineCount = 0;
        } else {
          drawText(ctx, meleeWeapons[i].ability, 550, mTextPos + textOffset, wpnFont, "center", "black");
        }

        // If there is no ability, draw a '-'
        if (meleeWeapons[i].ability.length === 0) {
          drawText(ctx, "-", 550, textPosY + textOffset, wpnFont, "center", "black");
        }

        // Check if odd or even. Odd means fully transparent, even means partially
        if (i % 2 === 0) {
          ctx.globalAlpha = 0.1;
        } else {
          ctx.globalAlpha = 0.3;
        }

        // Finally, draw our image
        ctx.drawImage(image, wpnBannerPosX, wpnBannerPosY + imageOffset, width, height * currentWpnLineCount);

        // If we have a battle damaged weapon, add battle damage icon
        if (meleeWeapons[i].isBattleDamaged) {
          drawBattleDamagedWeaponIcon(
            ctx,
            AbilityIconPath.battleDamagedWeaponPath,
            wpnBannerPosX,
            wpnBannerPosY + imageOffset
          );
        }

        textOffset += 18 * currentWpnLineCount;
        imageOffset = imageOffset + 18 * currentWpnLineCount;
        yAnchor += textOffset;
        lineCount += currentWpnLineCount;
        tempLineCount = 0;
        currentWpnLineCount = 1;
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
  const maxTitleLength = 415;
  const offset = 75;
  const x = ctx.canvas.width / 2 + offset;
  ctx.textAlign = "center";
  ctx.globalAlpha = 1;
  ctx.font = warscrollNameFontSize.toString() + "px Minion Pro";
  ctx.fillStyle = "white";
  const doubleSpaceOffset = +10;

  const lineLength = ctx.measureText(warscrollName).width;

  if (lineLength >= maxTitleLength) {
    const words = warscrollName.split(" ");
    let line = "";

    // Check if the first word is greater then the max line limit.
    if (ctx.measureText(words[0]).width >= maxTitleLength) {
      const word = words[0];
      let line = "";

      // Check the biggest size word we can use
      for (let q = word.length; q > 0; q--) {
        line = word.slice(0, q);
        if (ctx.measureText(line).width <= maxTitleLength) {
          ctx.fillText(line, x, y - doubleSpaceOffset);
          break;
        }
      }
      // Handle the remaining part of the word
      line = word.slice(line.length) + " ";
      ctx.font = warscrollNameFontSize.toString() + "px Minion Pro";
      // Handle the remaining words
      for (let k = 1; k < words.length; k++) {
        // Determine the most words we can fit on a line without exceeding max, and draw that line.
        if (ctx.measureText(line + words[k]).width <= maxTitleLength) {
          line += words[k] + " ";
        } else {
          line = words[k] + " ";
          break;
        }
      }
      ctx.fillText(line, x, y + 20);
      ctx.font = factionTitleFontSize.toString() + "px Minion Pro Bold";
      ctx.fillText(factionText, x, y - 35 - doubleSpaceOffset);
      ctx.font = factionTitleFontSize.toString() + "px Minion Pro Bold";
      ctx.fillText(subtitle, x, y + 30 + doubleSpaceOffset);
    } else {
      // Essentially if someone is using the app normally, do this.
      for (let i = 0; i < words.length; i++) {
        // Determine the most words we can fit on a line without exceeding max, and draw that line.
        if (ctx.measureText(line + words[i]).width <= maxTitleLength) {
          line += words[i] + " ";
        } else {
          ctx.fillText(line, x, y - doubleSpaceOffset);
          ctx.font = factionTitleFontSize.toString() + "px Minion Pro Bold";
          ctx.fillText(factionText, x, y - 35 - doubleSpaceOffset);
          line = words[i] + " ";
        }
      }
      // Now that we've drawn the first line, draw the entirety of the second
      ctx.font = warscrollNameFontSize.toString() + "px Minion Pro";
      ctx.fillText(line, x, y + 20);
      ctx.font = factionTitleFontSize.toString() + "px Minion Pro Bold";
      ctx.fillText(subtitle, x, y + 30 + doubleSpaceOffset);
    }
  } else {
    ctx.fillText(warscrollName, x, y);
    ctx.font = factionTitleFontSize.toString() + "px Minion Pro Bold";
    ctx.fillText(subtitle, x, y + 20);
    ctx.fillText(factionText, x, y - 35);
  }
};
