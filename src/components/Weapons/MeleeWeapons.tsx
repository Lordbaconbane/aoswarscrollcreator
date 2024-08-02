import { WeaponAbilities } from "./WeaponAbilities";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setAllWeaponNames, setMeleeWeapons } from "./WeaponsSlice";

import { AccordionDetails, Button, Typography, TextField, MenuItem, Autocomplete, Chip } from "@mui/material";
import { validateDiceInput } from "../WarscrollCard/WarscrollUtils";
import { useState } from "react";

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
  const dispatch = useDispatch();

  const meleeWeapons = useSelector((state: RootState) => state.weapons.meleeWeaponStats);

  const [errors, setErrors] = useState({
    atk: false,
    damage: false,
  });

  const handleInputChange = (event, index: number, field: keyof (typeof meleeWeapons)[0]) => {
    console.log(event.target.value);
    const isValid = validateDiceInput(event.target.value);
    if (isValid || !event.target.value.toString()) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
      handleInputMeleeChange(index, field, event.target.value.toString());
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
            rend: "",
            damage: "",
            ability: "",
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
      {meleeWeapons.map((weapon, index) => (
        <div
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
            {["1", "2", "3", "4", "5", "6"].map((num) => (
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
            renderInput={(params) => <TextField {...params} label="Ability" sx={{ mb: 1, mr: 1, mt: 1 }} />}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleRemoveMeleeWeapon(index)}
            sx={{ mr: 1, mt: 1 }}
          >
            <Typography variant="body1">{"Remove Melee Weapon: " + meleeWeapons[index].name}</Typography>
          </Button>
        </div>
      ))}
    </AccordionDetails>
  );
}
