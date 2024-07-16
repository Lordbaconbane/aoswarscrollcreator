import {
  AccordionDetails,
  Box,
  Button,
  TextField,
  Typography,
  Autocomplete,
  Chip,
} from "@mui/material";
import { AbilityKeywords } from "./AbilitiesInfo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setAbilities } from "./AbilitiesSlice";

export interface Ability {
  name: string;
  name_desc: string;
  declare_desc: string;
  effect_desc: string;
  keywords: string;
  ability_type: string;
  ability_type_value: string;
  ability_phase: string;
}

export default function Abilities() {
  const dispatch = useDispatch();
  const abilities = useSelector((state: RootState) => state.abilities.abilities);

  const handleAddAbility = () => {
    dispatch(
      setAbilities([
        ...abilities,
        {
          name: "",
          name_desc: "",
          declare_desc: "",
          effect_desc: "",
          keywords: "",
          ability_type: "",
          ability_type_value: "",
          ability_phase: "",
        },
      ])
    );
  };

  // const handleRemoveAbility = (index: number) => {
  //   dispatch(setAbilities(abilities.filter((_abilities, i) => i !== index)));
  // };

  const handleInputAbilityChange = (
    index: number,
    field: keyof (typeof abilities)[0],
    value: string
  ) => {
    // Create a copy of the array and the object at the specific index
    const newAbilities = abilities.map((ability, i) =>
      i === index ? { ...ability, [field]: value } : ability
    );
    dispatch(setAbilities(newAbilities));
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
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleAddAbility}>
        <Typography variant="body1">{"Add Ability"}</Typography>
      </Button>
      {abilities.map((ability, index) => (
        <Box key={index} sx={{ mb: "16", display: "flex", flexWrap: "wrap" }}>
          <TextField
            label="Ability name"
            fullWidth
            value={ability.name}
            onChange={(e) => handleInputAbilityChange(index, "name", e.target.value)}
            sx={{ mb: 1 }}
          ></TextField>
          <TextField
            label="Ability Description"
            fullWidth
            multiline
            value={ability.name_desc}
            onChange={(e) => handleInputAbilityChange(index, "name_desc", e.target.value)}
            sx={{ mb: 1 }}
          ></TextField>
          <TextField
            label="Declare Description (Leave blank if not needed, autofills Declare: )"
            fullWidth
            multiline
            value={ability.declare_desc}
            onChange={(e) => handleInputAbilityChange(index, "declare_desc", e.target.value)}
            sx={{ mb: 1 }}
          ></TextField>
          <TextField
            label="Effect Description (Leave blank if not needed, autofills Effect: )"
            fullWidth
            multiline
            value={ability.effect_desc}
            onChange={(e) => handleInputAbilityChange(index, "effect_desc", e.target.value)}
            sx={{ mb: 1 }}
          ></TextField>
          <Autocomplete
            clearIcon={false}
            options={AbilityKeywords}
            freeSolo
            fullWidth
            multiple
            onChange={(_event, value) => {
              handleInputAbilityChange(index, "keywords", value.join(", "));
            }}
            renderTags={(value, props) =>
              value.map((option, index) => <Chip label={option} {...props({ index })} />)
            }
            renderInput={(params) => (
              <TextField
                label="Ability Keywords (Rampage, Spell, Prayer, etc)"
                {...params}
                id="ability-keywords"
              />
            )}
          />
        </Box>
      ))}
    </AccordionDetails>
  );
}
