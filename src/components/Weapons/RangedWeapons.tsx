import { WeaponAbilities } from "./WeaponAbilities";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setAllWeaponNames, setRangedWeapons } from "./WeaponsSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
  TextField,
  MenuItem,
  Autocomplete,
  Chip,
  Box,
} from "@mui/material";
import { validateDiceInput } from "../WarscrollCard/WarscrollUtils";
import { useState } from "react";

export interface RangedWeaponStats {
  name: string;
  range: string;
  atk: string;
  toHit: string;
  toWound: string;
  rend: string;
  damage: string;
  ability: string;
  isBattleDamaged: boolean;
}

export default function RangedWeapons() {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    range: false,
    atk: false,
    damage: false,
  });

  const rangedWeapons = useSelector((state: RootState) => state.weapons.rangedWeaponStats);

  const handleAddRangedWeapon = () => {
    if (rangedWeapons.length < 5) {
      dispatch(
        setRangedWeapons([
          ...rangedWeapons,
          {
            name: "",
            range: "",
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
      setAllWeaponNames();
    }
  };

  const handleInputChange = (event, index: number, field: keyof (typeof rangedWeapons)[0]) => {
    const isValid = validateDiceInput(event.target.value);
    if (isValid || !event.target.value.toString()) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
      handleInputRangedChange(index, field, event.target.value.toString().toUpperCase());
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
    }
  };

  const handleRemoveRangedWeapon = (index: number) => {
    dispatch(setRangedWeapons(rangedWeapons.filter((_RangedWaponStats, i) => i !== index)));
  };

  const handleInputRangedChange = (index: number, field: keyof (typeof rangedWeapons)[0], value: string) => {
    // Create a copy of the array and the object at the specific index
    const newRangedWeapons = rangedWeapons.map((weapon, i) =>
      i === index ? { ...weapon, [field]: value } : weapon
    );
    dispatch(setRangedWeapons(newRangedWeapons));
    if (field === "name") {
      dispatch(setAllWeaponNames());
    }
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
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleAddRangedWeapon}>
        <Typography variant="body1">{"Add Ranged Weapon"}</Typography>
      </Button>
      {rangedWeapons.map((weapon, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary sx={{ bgcolor: "#3D3D3D" }} expandIcon={<ExpandMoreIcon />}>
            <Typography>{weapon.name || `Weapons ${index + 1}`}</Typography>
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
                onChange={(e) => handleInputRangedChange(index, "name", e.target.value)}
                sx={{ mb: 1 }}
              />
              <TextField
                label="Range"
                value={weapon.range}
                error={errors.range}
                helperText={errors.range ? "Invalid range value" : ""}
                onChange={(e) => handleInputChange(e, index, "range")}
                sx={{ mb: 1, mr: 1, mt: 1, width: "12ch" }}
              ></TextField>
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
                onChange={(e) => handleInputRangedChange(index, "toHit", e.target.value)}
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
                onChange={(e) => handleInputRangedChange(index, "toWound", e.target.value)}
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
                onChange={(e) => handleInputRangedChange(index, "rend", e.target.value)}
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
                error={errors.damage}
                helperText={errors.damage ? "Invalid damage value" : ""}
                onChange={(e) => handleInputChange(e, index, "damage")}
                sx={{ mb: 1, mr: 1, mt: 1, width: "12ch" }}
              ></TextField>
              <Autocomplete
                options={WeaponAbilities}
                clearIcon={false}
                fullWidth
                freeSolo
                multiple
                onChange={(_e, newValue) => handleInputRangedChange(index, "ability", newValue.join(", "))}
                renderTags={(value, props) =>
                  value.map((option, index) => <Chip label={option} {...props({ index })} />)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Ability" sx={{ mb: 1, mr: 1, mt: 1 }} />
                )}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveRangedWeapon(index)}
                sx={{ mr: 1, mt: 1 }}
              >
                <Typography variant="body1">
                  {"Remove Ranged Weapon: " + rangedWeapons[index].name}
                </Typography>
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </AccordionDetails>
  );
}
