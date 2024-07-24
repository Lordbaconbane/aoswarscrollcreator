import React, { useRef, useEffect } from "react";
import { Container, Box } from "@mui/material";

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

const charFontSize = 26;

export interface Coordinate {
  x: number;
  y: number;
}

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

  const warscrollSubtype = useSelector((state: RootState) => state.characteristics.warscrollSubtype);

  const moveChar = useSelector((state: RootState) => state.characteristics.warscrollMove);

  const healthChar = useSelector((state: RootState) => state.characteristics.warscrollHealth);

  const saveChar = useSelector((state: RootState) => state.characteristics.warscrollSave);

  const controlChar = useSelector((state: RootState) => state.characteristics.warscrollControl);

  const keywordIdentities = useSelector((state: RootState) => state.keywords.keywordIdentities);

  const keywordAbilities = useSelector((state: RootState) => state.keywords.keywordAbilities);

  const meleeWeapons = useSelector((state: RootState) => state.weapons.meleeWeaponStats);

  const rangedWeapons = useSelector((state: RootState) => state.weapons.rangedWeaponsStats);

  const abilities = useSelector((state: RootState) => state.abilities.abilities);

  const loadoutBody = useSelector((state: RootState) => state.loadout.body);
  const loadoutPoints = useSelector((state: RootState) => state.loadout.points);

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
    const ctx = canvas?.getContext("2d");
    const image = imageRef.current;
    const weaponBannerImage = weaponBannerImageRef.current;
    image.src = factionTemplate;
    weaponBannerImage.src = factionWeaponBanner;

    const coords: Coordinate[] = [{ x: 0, y: 0 }];

    image.onload = () => {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawImageOnCanvas(ctx, image, canvas);

        // Draw title
        drawWarscrollTitleTextOnCanvas(
          ctx,
          "• " + factionName.toUpperCase() + " WARSCROLL •",
          warscrollName.toUpperCase(),
          warscrollSubtype.toUpperCase(),
          115
        );
        // Draw characteristics
        drawText(ctx, moveChar, 104, 80, charFontSize, "center", "white");
        drawText(ctx, controlChar, 104, 147, charFontSize, "center", "white");
        drawText(ctx, healthChar, 74, 115, charFontSize, "center", "white");
        drawText(ctx, saveChar, 137, 115, charFontSize, "center", "white");

        // Draw Weapons
        coords[0].y = drawWeaponsOnCanvas(ctx, weaponBannerImage, rangedWeapons, meleeWeapons);

        // If we have a loadout, push a new element in our display and draw our loadout.
        const hasLoadout = loadoutBody.length > 0;
        if (hasLoadout) {
          const newCoordinate: Coordinate = { x: 0, y: coords[0].y };
          coords.push(newCoordinate);

          coords[0].y = drawLoadoutOnCanvas(ctx, loadoutBody, loadoutPoints, coords[0].y, 300);
        }

        drawAbilitiesOnCanvas(ctx, canvas, abilities, coords, hasLoadout);
        ctx.save();

        // Draw Keywords
        drawText(
          ctx,
          keywordAbilities.join(", ").toUpperCase(),
          ctx.canvas.width / 2,
          932,
          11,
          "center",
          "black"
        );
        drawText(
          ctx,
          keywordIdentities.join(", ").toUpperCase(),
          ctx.canvas.width / 2,
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
    loadoutBody,
    loadoutPoints,
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
              height: "100vh",
              width: "70vh",
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
