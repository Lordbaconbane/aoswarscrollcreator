import React, { useState, useCallback } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { MeleeWeaponStats } from "../Weapons/MeleeWeapons";
import { RangedWeaponStats } from "../Weapons/RangedWeapons";
import { Ability } from "../Abilities/Abilities";
import { useDispatch } from "react-redux";
import { setAbilities } from "../Abilities/AbilitiesSlice";
import { setMeleeWeapons } from "../Weapons/WeaponsSlice";
import { setRangedWeapons } from "../Weapons/WeaponsSlice";

export enum InputType {
  melee = "melee",
  ranged = "ranged",
  ability = "ability",
}

export function useUndo() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [inputType, setInputType] = useState<InputType>();

  type DataType = MeleeWeaponStats | RangedWeaponStats | Ability;
  const [dataArray, setDataArray] = useState<DataType[]>([]);

  const showUndo = useCallback((data: DataType[], input: InputType) => {
    setDataArray(data);
    setInputType(input);
    setOpen(true);
  }, []);

  const hideUndo = useCallback((_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway" || reason === "escapeKeyDown") {
      setOpen(false);
      return;
    }
  }, []);

  const undo = () => {
    console.log("Undo");
    if (inputType === InputType.ability) {
      dispatch(setAbilities(dataArray as Ability[]));
      setOpen(false);
    } else if (inputType === InputType.melee) {
      dispatch(setMeleeWeapons(dataArray as MeleeWeaponStats[]));
      setOpen(false);
    } else if (inputType === InputType.ranged) {
      dispatch(setRangedWeapons(dataArray as RangedWeaponStats[]));
      setOpen(false);
    } else {
      console.warn("Type not recognized, could not undo latest action.");
    }
  };

  const undoBar = (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={hideUndo}
      message="Undo last action?"
      action={
        <>
          <Button color="secondary" size="small" onClick={undo}>
            <Typography variant="body2">{"Undo?"}</Typography>
          </Button>
          <IconButton size="small" aria-label="close" color="inherit" onClick={hideUndo}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  );

  return { showUndo, undoBar };
}
