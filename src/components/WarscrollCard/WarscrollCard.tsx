import React, { useRef, useEffect } from "react";
import { Container, Box, useMediaQuery, Theme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { resetDownload } from "./WarscrollCardSlice";

import {
  drawImageOnCanvas,
  drawText,
  drawAbilitiesOnCanvas,
  drawWarscrollTitleTextOnCanvas,
  drawWeaponsOnCanvas,
  drawLoadoutOnCanvas,
} from "./WarscrollUtils";

const charFontSize = 25;
const charReducedFontSize = 19;

export interface Coordinate {
  x: number;
  y: number;
}

const WarscrollCard: React.FC = () => {
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const characteristicsCanvasRef = useRef<HTMLCanvasElement>(null);
  const bodyCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(new Image());
  const weaponBannerImageRef = useRef<HTMLImageElement>(new Image());
  const dispatch = useDispatch();

  const triggerDownload = useSelector((state: RootState) => state.warscroll.triggerDownload);

  const factionTemplate = useSelector((state: RootState) => state.faction.factionTemplate);
  const factionWeaponBanner = useSelector((state: RootState) => state.faction.factionWeaponBanner);
  const factionName = useSelector((state: RootState) => state.faction.factionName);
  const customFactionName = useSelector((state: RootState) => state.faction.customFactionName);

  const warscrollName = useSelector((state: RootState) => state.characteristics.warscrollName);
  const warscrollSubtype = useSelector((state: RootState) => state.characteristics.warscrollSubtype);

  const moveChar = useSelector((state: RootState) => state.characteristics.warscrollMove);
  const healthChar = useSelector((state: RootState) => state.characteristics.warscrollHealth);
  const saveChar = useSelector((state: RootState) => state.characteristics.warscrollSave);
  const controlChar = useSelector((state: RootState) => state.characteristics.warscrollControl);

  const keywordIdentities = useSelector((state: RootState) => state.keywords.keywordIdentities);
  const keywordAbilities = useSelector((state: RootState) => state.keywords.keywordAbilities);

  const meleeWeapons = useSelector((state: RootState) => state.weapons.meleeWeaponStats);
  const rangedWeapons = useSelector((state: RootState) => state.weapons.rangedWeaponStats);

  const abilities = useSelector((state: RootState) => state.abilities.abilities);

  const loadoutBody = useSelector((state: RootState) => state.loadout.body);
  const loadoutPoints = useSelector((state: RootState) => state.loadout.points);

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    if (triggerDownload) {
      const backgroundCanvas = backgroundCanvasRef.current;
      const characteristicsCanvas = characteristicsCanvasRef.current;
      const bodyCanvas = bodyCanvasRef.current;

      if (backgroundCanvas && characteristicsCanvas && bodyCanvas) {
        const link = document.createElement("a");
        const backgroundCtx = backgroundCanvas.getContext("2d");
        const characteristicsCtx = characteristicsCanvas.getContext("2d");
        const bodyCtx = bodyCanvas.getContext("2d");

        // Combine canvases into a single image
        const combinedCanvas = document.createElement("canvas");
        combinedCanvas.width = backgroundCanvas.width;
        combinedCanvas.height = backgroundCanvas.height;
        const combinedCtx = combinedCanvas.getContext("2d");

        if (combinedCtx && backgroundCtx && characteristicsCtx && bodyCtx) {
          combinedCtx.drawImage(backgroundCanvas, 0, 0);
          combinedCtx.drawImage(characteristicsCanvas, 0, 0);
          combinedCtx.drawImage(bodyCanvas, 0, 0);
          link.href = combinedCanvas.toDataURL("image/png");
          link.download = warscrollName + "_Warscroll.png";
          link.click();
        }
      }
      dispatch(resetDownload());
    }
  }, [triggerDownload, dispatch, warscrollName]);

  useEffect(() => {
    const backgroundCanvas = backgroundCanvasRef.current;
    const backgroundCtx = backgroundCanvas?.getContext("2d");
    const image = imageRef.current;

    image.src = factionTemplate;

    image.onload = () => {
      if (backgroundCtx && backgroundCanvas) {
        backgroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
        drawImageOnCanvas(backgroundCtx, image, backgroundCanvas);
      }
    };
  }, [factionTemplate]);

  useEffect(() => {
    const characteristicsCanvas = characteristicsCanvasRef.current;
    const characteristicsCtx = characteristicsCanvas?.getContext("2d");

    if (characteristicsCtx && characteristicsCanvas) {
      characteristicsCtx.clearRect(0, 0, characteristicsCanvas.width, characteristicsCanvas.height);

      let factionTitle = factionName;
      if (customFactionName != null) {
        if (customFactionName.length > 0) factionTitle = customFactionName;
      }
      // Draw title
      drawWarscrollTitleTextOnCanvas(
        characteristicsCtx,
        "• " + factionTitle.toUpperCase() + " WARSCROLL •",
        warscrollName.toUpperCase(),
        warscrollSubtype.toUpperCase(),
        115
      );
      // Draw characteristics
      if (moveChar.length > 3) {
        drawText(characteristicsCtx, moveChar + '"', 107, 76, charReducedFontSize, "center", "white");
      } else {
        drawText(characteristicsCtx, moveChar + '"', 106, 80, charFontSize, "center", "white");
      }

      drawText(characteristicsCtx, controlChar, 104, 147, charFontSize, "center", "white");
      drawText(characteristicsCtx, healthChar, 74, 115, charFontSize, "center", "white");
      drawText(characteristicsCtx, saveChar, 137, 115, charFontSize, "center", "white");

      // Draw Keywords
      drawText(
        characteristicsCtx,
        keywordAbilities.join(", ").toUpperCase(),
        characteristicsCtx.canvas.width / 2,
        932,
        11,
        "center",
        "black"
      );
      characteristicsCtx.save();
      drawText(
        characteristicsCtx,
        keywordIdentities.join(", ").toUpperCase(),
        characteristicsCtx.canvas.width / 2,
        960,
        11,
        "center",
        "black"
      );
      characteristicsCtx.save();
    }
  }, [
    customFactionName,
    factionName,
    warscrollName,
    warscrollSubtype,
    moveChar,
    healthChar,
    controlChar,
    saveChar,
    keywordAbilities,
    keywordIdentities,
  ]);

  useEffect(() => {
    const bodyCanvas = bodyCanvasRef.current;
    const bodyCtx = bodyCanvas?.getContext("2d");
    const weaponBannerImage = weaponBannerImageRef.current;

    weaponBannerImage.src = factionWeaponBanner;

    const coords: Coordinate[] = [{ x: 0, y: 0 }];

    weaponBannerImage.onload = () => {
      if (bodyCtx && bodyCanvas) {
        bodyCtx.clearRect(0, 0, bodyCanvas.width, bodyCanvas.height);

        // Draw Weapons
        coords[0].y = drawWeaponsOnCanvas(bodyCtx, weaponBannerImage, rangedWeapons, meleeWeapons);
        bodyCtx.save();

        // If we have a loadout, push a new element in our display and draw our loadout.
        const hasLoadout = loadoutBody.length > 0;
        if (hasLoadout) {
          const newCoordinate: Coordinate = { x: 0, y: coords[0].y };
          coords.push(newCoordinate);

          coords[0].y = drawLoadoutOnCanvas(bodyCtx, loadoutBody, loadoutPoints, coords[0].y, 300);
          bodyCtx.save();
        }

        drawAbilitiesOnCanvas(bodyCtx, bodyCanvas, abilities, coords, hasLoadout, loadoutPoints.length);
        bodyCtx.save();
      }
    };
  }, [factionWeaponBanner, rangedWeapons, meleeWeapons, loadoutBody, loadoutPoints, abilities]);

  return (
    <Box component="main" className="sticky-canvas">
      <Container style={{ overflowY: "auto", display: "flex" }}>
        <Box style={{ position: "relative", width: "658px", height: "995px" }}>
          <canvas
            ref={backgroundCanvasRef}
            className="sticky-canvas"
            width={658}
            height={995}
            style={{
              height: isMobile ? "70vh" : "100vh",
              width: isMobile ? "49vh" : "70vh",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
          <canvas
            ref={characteristicsCanvasRef}
            className="sticky-canvas"
            width={658}
            height={995}
            style={{
              height: isMobile ? "70vh" : "100vh",
              width: isMobile ? "49vh" : "70vh",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
          <canvas
            ref={bodyCanvasRef}
            className="sticky-canvas"
            width={658}
            height={995}
            style={{
              height: isMobile ? "70vh" : "100vh",
              width: isMobile ? "49vh" : "70vh",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default WarscrollCard;
