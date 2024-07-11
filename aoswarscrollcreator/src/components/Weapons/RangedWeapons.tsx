import { WeaponAbilities } from "./WeaponAbilities";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setRangedWeapons } from "./WeaponsSlice";

import {
  AccordionDetails,
  Button,
  Typography,
  TextField,
  MenuItem,
  Autocomplete,
  Chip,
} from "@mui/material";

export interface RangedWeaponStats {
  name: string;
  range: string;
  toHit: string;
  toWound: string;
  rend: string;
  damage: string;
  ability: string;
}

export default function RangedWeapons() {
  const dispatch = useDispatch();

  const rangedWeapons = useSelector(
    (state: RootState) => state.weapons.rangedWeaponsStats
  );

  const handleAddRangedWeapon = () => {
    if (rangedWeapons.length < 5) {
      dispatch(
        setRangedWeapons([
          ...rangedWeapons,
          {
            name: "",
            range: "",
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

  const handleRemoveRangedWeapon = (index: number) => {
    dispatch(
      setRangedWeapons(
        rangedWeapons.filter((_RangedWaponStats, i) => i !== index)
      )
    );
  };

  const handleInputRangedChange = (
    index: number,
    field: keyof (typeof rangedWeapons)[0],
    value: string
  ) => {
    // Create a copy of the array and the object at the specific index
    const newRangedWeapons = rangedWeapons.map((weapon, i) =>
      i === index ? { ...weapon, [field]: value } : weapon
    );
    dispatch(setRangedWeapons(newRangedWeapons));
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
        onClick={handleAddRangedWeapon}
      >
        <Typography variant="body1">{"Add Ranged Weapon"}</Typography>
      </Button>
      {rangedWeapons.map((weapon, index) => (
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
              handleInputRangedChange(index, "name", e.target.value)
            }
            sx={{ mb: 1 }}
          />
          <TextField
            label="To Hit"
            select
            value={weapon.toHit}
            onChange={(e) =>
              handleInputRangedChange(index, "toHit", e.target.value)
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
              handleInputRangedChange(index, "toWound", e.target.value)
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
              handleInputRangedChange(index, "rend", e.target.value)
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
              handleInputRangedChange(index, "damage", e.target.value)
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
            clearIcon={false}
            fullWidth
            freeSolo
            multiple
            onChange={(_e, newValue) =>
              handleInputRangedChange(index, "ability", newValue.join(", "))
            }
            renderTags={(value, props) =>
              value.map((option, index) => (
                <Chip label={option} {...props({ index })} />
              ))
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
            onClick={() => handleRemoveRangedWeapon(index)}
            sx={{ mr: 1, mt: 1 }}
          >
            <Typography variant="body1">{"Remove Ranged Weapon"}</Typography>
          </Button>
        </div>
      ))}
    </AccordionDetails>
  );
}
