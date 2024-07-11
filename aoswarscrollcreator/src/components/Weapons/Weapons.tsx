import { WeaponAbilities } from "./WeaponAbilities";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setMeleeWeapons /*setRangedWeapons*/ } from "./WeaponsSlice";

import {
  AccordionDetails,
  Button,
  Typography,
  TextField,
  MenuItem,
  Autocomplete,
} from "@mui/material";

export interface MeleeWeaponStats {
  name: string;
  toHit: string;
  toWound: string;
  rend: string;
  damage: string;
  ability: string;
}

export interface RangedWeaponStats {
  name: string;
  toHit: string;
  toWound: string;
  rend: string;
  damage: string;
  ability: string;
}

export default function Weapons() {
  const dispatch = useDispatch();

  const meleeWeapons = useSelector(
    (state: RootState) => state.weapons.meleeWeaponStats
  );

  // const rangedWeapons = useSelector(
  //   (state: RootState) => state.weapons.rangedWeaponsStats
  // );

  const handleAddMeleeWeapon = () => {
    if (meleeWeapons.length < 5) {
      dispatch(
        setMeleeWeapons([
          ...meleeWeapons,
          {
            name: "",
            toHit: "",
            toWound: "",
            rend: "",
            damage: "",
            ability: "",
          },
        ])
      );
    }
  };

  const handleRemoveMeleeWeapon = (index: number) => {
    dispatch(setMeleeWeapons(meleeWeapons.filter((_, i) => i !== index)));
  };

  const handleInputMeleeChange = (
    index: number,
    field: keyof (typeof meleeWeapons)[0],
    value: string
  ) => {
    // Create a copy of the array and the object at the specific index
    const newMeleeWeapons = meleeWeapons.map((weapon, i) =>
      i === index ? { ...weapon, [field]: value } : weapon
    );
    dispatch(setMeleeWeapons(newMeleeWeapons));
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
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleAddMeleeWeapon}
      >
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
            onChange={(e) =>
              handleInputMeleeChange(index, "name", e.target.value)
            }
            sx={{ mb: 1 }}
          />
          <TextField
            label="To Hit"
            select
            value={weapon.toHit}
            onChange={(e) =>
              handleInputMeleeChange(index, "toHit", e.target.value)
            }
            sx={{ mb: 1, mr: 1, mt: 1, width: "14ch" }}
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
            onChange={(e) =>
              handleInputMeleeChange(index, "toWound", e.target.value)
            }
            sx={{ mb: 1, mr: 1, mt: 1, width: "14ch" }}
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
            onChange={(e) =>
              handleInputMeleeChange(index, "rend", e.target.value)
            }
            sx={{ mb: 1, mr: 1, mt: 1, width: "14ch" }}
          >
            {["1", "2", "3", "4", "5", "6"].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Damage"
            select
            value={weapon.damage}
            onChange={(e) =>
              handleInputMeleeChange(index, "damage", e.target.value)
            }
            sx={{ mb: 1, mr: 1, mt: 1, width: "14ch" }}
          >
            {["1", "2", "3", "4", "5", "6"].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </TextField>
          <Autocomplete
            options={WeaponAbilities}
            fullWidth
            freeSolo
            value={weapon.ability}
            onChange={(_e, newValue) =>
              handleInputMeleeChange(index, "ability", newValue ?? "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Ability"
                sx={{ mb: 1, mr: 1, mt: 1 }}
              />
            )}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleRemoveMeleeWeapon(index)}
            sx={{ mr: 1, mt: 1 }}
          >
            <Typography variant="body1">{"Remove Melee Weapon"}</Typography>
          </Button>
        </div>
      ))}
    </AccordionDetails>
  );
}
