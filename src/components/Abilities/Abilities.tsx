import {
  AccordionDetails,
  Box,
  Button,
  TextField,
  Typography,
  Autocomplete,
  Chip,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
} from "@mui/material";
import {
  AbilityIcon,
  AbilityKeywords,
  AbilityBanner,
  AbilityTimingText,
  AbilityType,
  AbilityUsageRestrictions,
  AbilityLineColor,
  AbilityTypeIcon,
  AbilityIconPath,
} from "./AbilitiesInfo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setAbilities } from "./AbilitiesSlice";
import { useState } from "react";

import BattleIcon from "../../../public/Icons/BattleDamaged_AbilityIcon.png";
import ControlIcon from "../../../public/Icons/Controlicon.png";
import DefensiveIcon from "../../../public/Icons/DefensiveIcon.png";
import MovementIcon from "../../../public/Icons/MovementIcon.png";
import OffensiveIcon from "../../../public/Icons/OffensiveIcon.png";
import RallyingIcon from "../../../public/Icons/RallyingIcon.png";
import ShootingIcon from "../../../public//Icons/ShootingIcon.png";
import SpecialIcon from "../../../public/Icons/SpecialIcon.png";
import { setAllWeaponNames, setBattleDamagedWeapon } from "../Weapons/WeaponsSlice";

const abilityTypeIconHeight = 24;
const abilityTypeIconWidth = 24;

export interface Ability {
  name: string;
  name_desc: string;
  declare_desc: string;
  effect_desc: string;
  keywords: string;
  ability_banner: string;
  ability_line_color: string;
  ability_icon: string;
  ability_icon_path: string;
  ability_phase: string;
  ability_timing: string;
  ability_type: string;
  ability_type_value: string;
  ability_icon_type_path: string;
  ability_restriction: string;
}

export default function Abilities() {
  const dispatch = useDispatch();
  const abilities = useSelector((state: RootState) => state.abilities.abilities);
  const allWeaponNames = useSelector((state: RootState) => state.weapons.allWeaponNames);
  const [isNonStandardAbility, setNonStandardAbility] = useState(false);

  const [isBattleDamaged, setBattleDamaged] = useState(false);

  const handleSetWeaponNames = () => {
    setAllWeaponNames();
  };

  const handleAbilityTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value != AbilityType.default) {
      setNonStandardAbility(event.target.checked);
    } else {
      setNonStandardAbility(false);
    }
  };

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
          ability_banner: AbilityBanner.start_deployment,
          ability_line_color: "",
          ability_icon: "",
          ability_icon_path: AbilityTypeIcon.none,
          ability_phase: "",
          ability_timing: "",
          ability_type: "",
          ability_type_value: "",
          ability_icon_type_path: "",
          ability_restriction: "",
        },
      ])
    );
  };

  const handleRemoveAbility = (index: number) => {
    dispatch(setAbilities(abilities.filter((_abilities, i) => i !== index)));
  };

  const handleInputAbilityChange = (
    index: number,
    field: keyof (typeof abilities)[0],
    value: string,
    secondField?: keyof (typeof abilities)[0],
    secondValue?: string
  ) => {
    // Create a copy of the array and the object at the specific index
    const newAbilities = abilities.map((ability, i) => {
      if (i === index) {
        const updatedAbility = { ...ability, [field]: value };
        if (secondField && secondValue) {
          updatedAbility[secondField] = secondValue;
        }
        return updatedAbility;
      }
      return ability;
    });

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
          {/* Ability name & description */}
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

          {/* Ability phase/special */}
          <FormControl>
            <Typography variant="body1" component="div">
              {"Ability phase/special (determines color)"}
            </Typography>
            <FormLabel id="ability-phase/special">
              <RadioGroup
                row
                aria-label="ability-phase/special-radio-button-group"
                name="ability-phase/special-radio-buttons-group"
                sx={{ mb: 1 }}
              >
                <FormControlLabel
                  value={AbilityBanner.start_deployment}
                  control={
                    <Radio
                      onChange={() =>
                        handleInputAbilityChange(
                          index,
                          "ability_banner",
                          AbilityBanner.start_deployment,
                          "ability_line_color",
                          AbilityLineColor.start_deployment
                        )
                      }
                    />
                  }
                  label="Start of Turn/Deployment"
                />
                <FormControlLabel
                  value={AbilityBanner.hero}
                  control={
                    <Radio
                      onChange={() =>
                        handleInputAbilityChange(
                          index,
                          "ability_banner",
                          AbilityBanner.hero,
                          "ability_line_color",
                          AbilityLineColor.hero
                        )
                      }
                    />
                  }
                  label="Hero"
                />
                <FormControlLabel
                  value={AbilityBanner.move}
                  control={
                    <Radio
                      onChange={() =>
                        handleInputAbilityChange(
                          index,
                          "ability_banner",
                          AbilityBanner.move,
                          "ability_line_color",
                          AbilityLineColor.move
                        )
                      }
                    />
                  }
                  label="Movement"
                />
                <FormControlLabel
                  value={AbilityBanner.shoot}
                  control={
                    <Radio
                      onChange={() =>
                        handleInputAbilityChange(
                          index,
                          "ability_banner",
                          AbilityBanner.shoot,
                          "ability_line_color",
                          AbilityLineColor.shoot
                        )
                      }
                    />
                  }
                  label="Shooting"
                />
                <FormControlLabel
                  value={AbilityBanner.charge}
                  control={
                    <Radio
                      onChange={() =>
                        handleInputAbilityChange(
                          index,
                          "ability_banner",
                          AbilityBanner.charge,
                          "ability_line_color",
                          AbilityLineColor.charge
                        )
                      }
                    />
                  }
                  label="Charge"
                />
                <FormControlLabel
                  value={AbilityBanner.combat}
                  control={
                    <Radio
                      onChange={() =>
                        handleInputAbilityChange(
                          index,
                          "ability_banner",
                          AbilityBanner.combat,
                          "ability_line_color",
                          AbilityLineColor.combat
                        )
                      }
                    />
                  }
                  label="Combat"
                />
                <FormControlLabel
                  value={AbilityBanner.end}
                  control={
                    <Radio
                      onChange={() =>
                        handleInputAbilityChange(
                          index,
                          "ability_banner",
                          AbilityBanner.end,
                          "ability_line_color",
                          AbilityLineColor.end
                        )
                      }
                    />
                  }
                  label="End of Turn"
                />
                <FormControlLabel
                  value={AbilityBanner.defensive}
                  control={
                    <Radio
                      onChange={() =>
                        handleInputAbilityChange(
                          index,
                          "ability_banner",
                          AbilityBanner.defensive,
                          "ability_line_color",
                          AbilityLineColor.defensive
                        )
                      }
                    />
                  }
                  label="Defensive"
                />
              </RadioGroup>
            </FormLabel>
          </FormControl>

          {/* Ability icon */}
          <Typography variant="body1" component="div">
            {"Ability icon (gives an idea at a glance)"}
          </Typography>
          <FormControl>
            <FormLabel id="ability-type">
              <RadioGroup
                row
                aria-label="ability-type-radio-button-group"
                name="ability-type-radio-buttons-group"
                value={ability.ability_icon}
                sx={{ mb: 1 }}
                onChange={(e) => {
                  handleAbilityTypeChange(e);
                }}
              >
                <FormControlLabel
                  value="Battle Damaged"
                  control={
                    <Radio
                      onClick={() => {
                        handleInputAbilityChange(
                          index,
                          "ability_icon",
                          AbilityIcon.battleDamaged,
                          "ability_icon_path",
                          AbilityIconPath.battleDamagedAbilityPath
                        );
                        setBattleDamaged(true);
                        handleSetWeaponNames();
                      }}
                    />
                  }
                  label={
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={BattleIcon}
                        alt="Battle Damaged Icon"
                        style={{ marginRight: 4, width: abilityTypeIconWidth, height: abilityTypeIconHeight }}
                      />
                      <Typography variant="body1" component="div">
                        {"Battle Damaged"}
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="Control"
                  control={
                    <Radio
                      onClick={() => {
                        handleInputAbilityChange(
                          index,
                          "ability_icon",
                          AbilityIcon.control,
                          "ability_icon_path",
                          AbilityIconPath.controlIconPath
                        );
                        setBattleDamaged(false);
                        dispatch(setBattleDamagedWeapon([""]));
                      }}
                    />
                  }
                  label={
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={ControlIcon}
                        alt="Control Icon"
                        style={{ marginRight: 4, width: abilityTypeIconWidth, height: abilityTypeIconHeight }}
                      />
                      <Typography variant="body1" component="div">
                        {"Control"}
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="Defensive"
                  control={
                    <Radio
                      onClick={() => {
                        handleInputAbilityChange(
                          index,
                          "ability_icon",
                          AbilityIcon.defensive,
                          "ability_icon_path",
                          AbilityIconPath.defensiveIconPath
                        );
                        setBattleDamaged(false);
                        dispatch(setBattleDamagedWeapon([""]));
                      }}
                    />
                  }
                  label={
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={DefensiveIcon}
                        alt="Defensive Icon"
                        style={{ marginRight: 4, width: abilityTypeIconWidth, height: abilityTypeIconHeight }}
                      />
                      <Typography variant="body1" component="div">
                        {"Defensive"}
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="Movement"
                  control={
                    <Radio
                      onClick={() => {
                        handleInputAbilityChange(
                          index,
                          "ability_icon",
                          AbilityIcon.move,
                          "ability_icon_path",
                          AbilityIconPath.movementIconPath
                        );
                        setBattleDamaged(false);
                        dispatch(setBattleDamagedWeapon([""]));
                      }}
                    />
                  }
                  label={
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={MovementIcon}
                        alt="Movement Icon"
                        style={{ marginRight: 4, width: abilityTypeIconWidth, height: abilityTypeIconHeight }}
                      />
                      <Typography variant="body1" component="div">
                        {"Movement"}
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="Offensive"
                  control={
                    <Radio
                      onClick={() => {
                        handleInputAbilityChange(
                          index,
                          "ability_icon",
                          AbilityIcon.offensive,
                          "ability_icon_path",
                          AbilityIconPath.OffensiveIconPath
                        );
                        setBattleDamaged(false);
                        dispatch(setBattleDamagedWeapon([""]));
                      }}
                    />
                  }
                  label={
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={OffensiveIcon}
                        alt="Offensive Icon"
                        style={{ marginRight: 8, width: abilityTypeIconWidth, height: abilityTypeIconHeight }}
                      />
                      <Typography variant="body1" component="div">
                        {"Offensive"}
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="Rallying"
                  control={
                    <Radio
                      onClick={() => {
                        handleInputAbilityChange(
                          index,
                          "ability_icon",
                          AbilityIcon.rally,
                          "ability_icon_path",
                          AbilityIconPath.rallyingIconPath
                        );
                        setBattleDamaged(false);
                        dispatch(setBattleDamagedWeapon([""]));
                      }}
                    />
                  }
                  label={
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={RallyingIcon}
                        alt="Rallying Icon"
                        style={{ marginRight: 8, width: abilityTypeIconWidth, height: abilityTypeIconHeight }}
                      />
                      <Typography variant="body1" component="div">
                        {"Rallying"}
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="Shooting"
                  control={
                    <Radio
                      onClick={() => {
                        handleInputAbilityChange(
                          index,
                          "ability_icon",
                          AbilityIcon.shoot,
                          "ability_icon_path",
                          AbilityIconPath.shootingIconPath
                        );
                        setBattleDamaged(false);
                        dispatch(setBattleDamagedWeapon([""]));
                      }}
                    />
                  }
                  label={
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={ShootingIcon}
                        alt="Shooting Icon"
                        style={{ marginRight: 8, width: abilityTypeIconWidth, height: abilityTypeIconHeight }}
                      />
                      <Typography variant="body1" component="div">
                        {"Shooting"}
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="Special"
                  control={
                    <Radio
                      onClick={() => {
                        handleInputAbilityChange(
                          index,
                          "ability_icon",
                          AbilityIcon.special,
                          "ability_icon_path",
                          AbilityIconPath.specialIconPath
                        );
                        setBattleDamaged(false);
                        dispatch(setBattleDamagedWeapon([""]));
                      }}
                    />
                  }
                  label={
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={SpecialIcon}
                        alt="Speciald Icon"
                        style={{ marginRight: 8, width: abilityTypeIconWidth, height: abilityTypeIconHeight }}
                      />
                      <Typography variant="body1" component="div">
                        {"Special"}
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </FormLabel>
          </FormControl>
          {/*Specifically for battle damaged*/}
          {isBattleDamaged && (
            <Autocomplete
              clearIcon={false}
              options={allWeaponNames}
              fullWidth
              multiple
              onChange={(_event, value) => {
                if (value != null) {
                  dispatch(setBattleDamagedWeapon(value));
                }
              }}
              renderTags={(value, props) =>
                value.map((option, index) => <Chip label={option} {...props({ index })} />)
              }
              renderInput={(params) => (
                <TextField
                  sx={{ mt: 1, mb: 1 }}
                  label="Select a weapon"
                  {...params}
                  id="battle-damaged-weapon"
                />
              )}
            />
          )}

          {/* Ability restrictions */}
          <Typography variant="body1" component="div" sx={{ mt: 1 }}>
            {"Ability timing & restrictions"}
          </Typography>

          <Autocomplete
            clearIcon={false}
            options={AbilityUsageRestrictions}
            fullWidth
            freeSolo
            onChange={(_event, value) => {
              if (value !== null) {
                handleInputAbilityChange(index, "ability_restriction", value);
              }
            }}
            renderTags={(value, props) =>
              value.map((option, index) => <Chip label={option} {...props({ index })} />)
            }
            renderInput={(params) => (
              <TextField
                sx={{ mt: 1, mb: 1 }}
                onChange={(e) => {
                  handleInputAbilityChange(index, "ability_restriction", e.target.value);
                }}
                label="Ability Restrictions (Once Per Turn (Army), etc)"
                {...params}
                id="ability-keywords"
              />
            )}
          />
          {/* Ability timing */}
          <Autocomplete
            clearIcon={false}
            options={AbilityTimingText}
            fullWidth
            freeSolo
            onChange={(_event, value) => {
              if (value !== null) {
                handleInputAbilityChange(index, "ability_timing", value);
              }
            }}
            renderTags={(value, props) =>
              value.map((option, index) => <Chip label={option} {...props({ index })} />)
            }
            renderInput={(params) => (
              <TextField
                sx={{ mb: 2 }}
                onChange={(e) => {
                  handleInputAbilityChange(index, "ability_timing", e.target.value);
                }}
                label="Ability Timing (Passive, End of Any Turn, Any Combat Phase, etc))"
                {...params}
                id="ability-keywords"
              />
            )}
          />
          {/* Ability type */}
          <FormControl>
            <Typography variant="body1" component="div">
              {"Ability type"}
            </Typography>
            <FormLabel id="ability-type">
              <RadioGroup
                row
                aria-label="ability-type-radio-button-group"
                name="ability-type-radio-buttons-group"
                value={ability.ability_type}
                sx={{ mb: 1 }}
                onChange={(e) => {
                  handleAbilityTypeChange(e);
                }}
              >
                <FormControlLabel
                  value="Standard"
                  control={
                    <Radio
                      onClick={() => {
                        handleInputAbilityChange(
                          index,
                          "ability_icon_type_path",
                          AbilityTypeIcon.none,
                          "ability_type",
                          AbilityType.default
                        );
                      }}
                    />
                  }
                  label="Standard"
                />
                <FormControlLabel
                  value="Command"
                  control={
                    <Radio
                      onClick={() => {
                        handleInputAbilityChange(
                          index,
                          "ability_icon_type_path",
                          AbilityTypeIcon.command,
                          "ability_type",
                          AbilityType.command
                        );
                      }}
                    />
                  }
                  label="Command"
                />
                <FormControlLabel
                  value="Spell"
                  control={
                    <Radio
                      onClick={() => {
                        handleInputAbilityChange(
                          index,
                          "ability_icon_type_path",
                          AbilityTypeIcon.spell,
                          "ability_type",
                          AbilityType.spell
                        );
                      }}
                    />
                  }
                  label="Spell"
                />
                <FormControlLabel
                  value="Prayer"
                  control={
                    <Radio
                      onClick={() => {
                        handleInputAbilityChange(
                          index,
                          "ability_icon_type_path",
                          AbilityTypeIcon.prayer,
                          "ability_type",
                          AbilityType.prayer
                        );
                      }}
                    />
                  }
                  label="Prayer"
                />
                {isNonStandardAbility && (
                  <TextField
                    value={ability.ability_type_value}
                    label={ability.ability_type + " value"}
                    variant="outlined"
                    margin="normal"
                    onChange={(e) => {
                      handleInputAbilityChange(index, "ability_type_value", e.target.value);
                    }}
                    inputProps={{
                      maxLength: 2,
                    }}
                    sx={{ width: "16ch", mb: 1 }}
                  ></TextField>
                )}
              </RadioGroup>
            </FormLabel>
          </FormControl>
          {/* Declare instructions */}
          <TextField
            label="Declare Instructions (Leave blank if not needed, autofills Declare: )"
            fullWidth
            multiline
            value={ability.declare_desc}
            onChange={(e) => handleInputAbilityChange(index, "declare_desc", e.target.value)}
            sx={{ mb: 1 }}
          ></TextField>
          {/* Effect instructions */}
          <TextField
            label="Effect Instructions (Leave blank if not needed, autofills Effect: )"
            fullWidth
            multiline
            value={ability.effect_desc}
            onChange={(e) => handleInputAbilityChange(index, "effect_desc", e.target.value)}
            sx={{ mb: 1 }}
          ></TextField>
          {/* Keywords instructions */}
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
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleRemoveAbility(index)}
            sx={{ mr: 1, mt: 1, mb: 3 }}
          >
            <Typography variant="body1">{"Remove Ability: " + abilities[index].name}</Typography>
          </Button>
          <Divider />
        </Box>
      ))}
    </AccordionDetails>
  );
}
