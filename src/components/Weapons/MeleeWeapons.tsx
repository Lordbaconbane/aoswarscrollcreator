import { WeaponAbilities } from "./WeaponAbilities";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setAllWeaponNames, setMeleeWeapons } from "./WeaponsSlice";
import Menu from "@mui/material/Menu";
import React from "react";

import {
  Accordion,
  AccordionDetails,
  Button,
  Typography,
  TextField,
  MenuItem,
  Autocomplete,
  Chip,
  Box,
  AccordionSummary,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { validateDiceInput } from "../WarscrollCard/WarscrollUtils";
import { useState } from "react";
import { Delete, MoreVert } from "@mui/icons-material";
import { moveAccordionUp, moveAccordionDown } from "../Layout/AccordianUtility";
import { useUndo, InputType } from "../Layout/Undo";

export interface MeleeWeaponStats {
  name: string;
  atk: string;
  toHit: string;
  toWound: string;
  rend: string;
  damage: string;
  ability: string;
  isBattleDamaged: boolean;
}

export default function MeleeWeapons() {
  const { showUndo, undoBar } = useUndo();

  const dispatch = useDispatch();

  const meleeWeapons = useSelector((state: RootState) => state.weapons.meleeWeaponStats);

  const [errors, setErrors] = useState({
    atk: false,
    damage: false,
  });

  const handleInputChange = (event, index: number, field: keyof (typeof meleeWeapons)[0]) => {
    const isValid = validateDiceInput(event.target.value);
    if (isValid || !event.target.value.toString()) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
      handleInputMeleeChange(index, field, event.target.value.toString().toUpperCase());
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
    }
  };

  const handleAddMeleeWeapon = () => {
    if (meleeWeapons.length < 5) {
      dispatch(
        setMeleeWeapons([
          ...meleeWeapons,
          {
            name: "",
            atk: "",
            toHit: "",
            toWound: "",
            rend: "-",
            damage: "",
            ability: "-",
            isBattleDamaged: false,
          },
        ])
      );
      dispatch(setAllWeaponNames());
    }
  };

  const handleRemoveMeleeWeapon = (index: number) => {
    dispatch(setMeleeWeapons(meleeWeapons.filter((_MeleeWaponStats, i) => i !== index)));
  };

  const handleInputMeleeChange = (index: number, field: keyof (typeof meleeWeapons)[0], value: string) => {
    // Create a copy of the array and the object at the specific index
    const newMeleeWeapons = meleeWeapons.map((weapon, i) =>
      i === index ? { ...weapon, [field]: value } : weapon
    );
    dispatch(setMeleeWeapons(newMeleeWeapons));
    if (field === "name") {
      dispatch(setAllWeaponNames());
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const moveMenuOpen = Boolean(anchorEl);
  const handleMoveMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMoveMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMoveAccodionUp = (meleeWeapons: MeleeWeaponStats[], index: number) => {
    const newMeleeWeapons = moveAccordionUp(meleeWeapons, index);
    if (newMeleeWeapons) {
      dispatch(setMeleeWeapons(newMeleeWeapons));
    }
  };

  const handleMoveAccodionDown = (meleeWeapons: MeleeWeaponStats[], index: number) => {
    const newMeleeWeapons = moveAccordionDown(meleeWeapons, index);
    if (newMeleeWeapons) {
      dispatch(setMeleeWeapons(newMeleeWeapons));
    }
  };

  const [capturedIndex, setCapturedIndex] = useState(0);
  const captureIndex = (index: number) => {
    setCapturedIndex(index);
  };

  return (
    <AccordionDetails
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        maxWidth: "100%",
      }}
    >
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleAddMeleeWeapon}>
        <Typography variant="body1">{"Add Melee Weapon"}</Typography>
      </Button>
      {undoBar /*Display outside of loop because if there are no elements it won't show.*/}
      {meleeWeapons.map((weapon, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary
            sx={{
              bgcolor: "#3D3D3D",
              borderRadius: "8px",
              display: "flex", // Use flexbox to position items
              justifyContent: "space-between", // Space items evenly
              alignItems: "center", // Align items vertically in the center
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography>{weapon.name || `Weapons ${index + 1}`}</Typography>
            <Box
              sx={{
                display: "flex", // Use flexbox to position the icon
                justifyContent: "flex-end", // Align icon to the right
                alignItems: "center", // Center icon vertically
                flexGrow: 1,
              }}
            >
              <IconButton
                sx={{ padding: 0, mr: 1 }}
                onClick={(event) => {
                  event.stopPropagation();
                  showUndo(meleeWeapons, InputType.melee);
                  handleRemoveMeleeWeapon(index);
                }}
              >
                <Delete />
              </IconButton>
              <IconButton
                sx={{ padding: 0, mr: 1 }}
                onClick={(event) => {
                  event.stopPropagation();
                  captureIndex(index);
                  handleMoveMenuClick(event);
                }}
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="vert-menu"
                anchorEl={anchorEl}
                open={moveMenuOpen}
                onClose={handleMoveMenuClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={(event) => {
                    event.stopPropagation();
                    handleMoveAccodionUp(meleeWeapons, capturedIndex);
                    handleMoveMenuClose();
                  }}
                >
                  <Typography variant="body2">{"Move Up"}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={(event) => {
                    event.stopPropagation();
                    handleMoveAccodionDown(meleeWeapons, capturedIndex);
                    handleMoveMenuClose();
                  }}
                >
                  <Typography variant="body2">{"Move Down"}</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              key={index}
              style={{
                marginBottom: "16px",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <TextField
                label="Weapon Name"
                fullWidth
                value={weapon.name}
                onChange={(e) => handleInputMeleeChange(index, "name", e.target.value)}
                sx={{ mb: 1 }}
              />
              <TextField
                label="Attacks"
                inputProps={{ maxLength: 5 }}
                value={weapon.atk}
                error={errors.atk}
                helperText={errors.atk ? "Invalid attack value" : ""}
                onChange={(e) => handleInputChange(e, index, "atk")}
                sx={{ mb: 1, mr: 1, mt: 1, width: "12ch" }}
              />
              <TextField
                label="To Hit"
                select
                value={weapon.toHit}
                onChange={(e) => handleInputMeleeChange(index, "toHit", e.target.value)}
                sx={{ mb: 1, mr: 1, mt: 1, width: "12ch" }}
              >
                {["1", "2", "3", "4", "5", "6"].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="To Wound"
                select
                value={weapon.toWound}
                onChange={(e) => handleInputMeleeChange(index, "toWound", e.target.value)}
                sx={{ mb: 1, mr: 1, mt: 1, width: "13ch" }}
              >
                {["1", "2", "3", "4", "5", "6"].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Rend"
                value={weapon.rend}
                select
                onChange={(e) => handleInputMeleeChange(index, "rend", e.target.value)}
                sx={{ mb: 1, mr: 1, mt: 1, width: "12ch" }}
              >
                {["-", "1", "2", "3", "4", "5", "6"].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Damage"
                value={weapon.damage}
                onChange={(e) => handleInputChange(e, index, "damage")}
                error={errors.damage}
                helperText={errors.damage ? "Invalid Damage input" : ""}
                sx={{ mb: 1, mr: 1, mt: 1, width: "12ch" }}
              ></TextField>
              <Autocomplete
                options={WeaponAbilities}
                clearIcon={false}
                fullWidth
                freeSolo
                multiple
                onChange={(_e, newValue) => handleInputMeleeChange(index, "ability", newValue.join(", "))}
                renderTags={(value, props) =>
                  value.map((option, index) => <Chip label={option} {...props({ index })} />)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Ability" sx={{ mb: 1, mr: 1, mt: 1 }} />
                )}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </AccordionDetails>
  );
}
