import {
  AccordionDetails,
  Box,
  Button,
  TextField,
  Typography,
  Autocomplete,
  MenuItem,
  Chip,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
  Accordion,
  AccordionSummary,
  IconButton,
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
import Menu from "@mui/material/Menu";
import React from "react";

import BattleIcon from "../../../public/Icons/BattleDamaged_AbilityIcon.png";
import ControlIcon from "../../../public/Icons/Controlicon.png";
import DefensiveIcon from "../../../public/Icons/DefensiveIcon.png";
import MovementIcon from "../../../public/Icons/MovementIcon.png";
import OffensiveIcon from "../../../public/Icons/OffensiveIcon.png";
import RallyingIcon from "../../../public/Icons/RallyingIcon.png";
import ShootingIcon from "../../../public//Icons/ShootingIcon.png";
import SpecialIcon from "../../../public/Icons/SpecialIcon.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { setAllWeaponNames, setBattleDamagedWeapon } from "../Weapons/WeaponsSlice";
import { validateNumericInput } from "../WarscrollCard/WarscrollUtils";
import { Delete, MoreVert } from "@mui/icons-material";
import { moveAccordionUp, moveAccordionDown } from "../Layout/AccordianUtility";
import { useUndo, InputType } from "../Layout/Undo";

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
  isBattleDamaged: boolean;
}

export default function Abilities() {
  const { showUndo, undoBar } = useUndo();
  const dispatch = useDispatch();
  const abilities = useSelector((state: RootState) => state.abilities.abilities);
  const allWeaponNames = useSelector((state: RootState) => state.weapons.allWeaponNames);
  const [isNonStandardAbility, setNonStandardAbility] = useState(false);

  const [errors, setErrors] = useState({
    value: false,
  });

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

  const handleInputChange = (event, index: number, field: keyof (typeof abilities)[0]) => {
    const isValid = validateNumericInput(event.target.value);
    if (isValid || !event.target.value.toString()) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
      handleInputAbilityChange(index, field, event.target.value.toString().toUpperCase());
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
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
          isBattleDamaged: false,
        },
      ])
    );
  };

  const handleRemoveAbility = (index: number) => {
    dispatch(setAbilities(abilities.filter((_abilities, i) => i !== index)));
  };

  const handleInputAbilityChange = (
    index: number,
    field: keyof Ability,
    value: string,
    secondField?: keyof Ability,
    secondValue?: string,
    isBattleDamagedValue?: boolean
  ) => {
    // Create a copy of the array and the object at the specific index
    const newAbilities = abilities.map((ability, i) => {
      if (i === index) {
        const updatedAbility = { ...ability, [field]: value };
        if (typeof secondValue === "string" && secondField != "isBattleDamaged") {
          if (secondField && secondValue) {
            updatedAbility[secondField] = secondValue;
          }
        }

        if (isBattleDamagedValue !== undefined) {
          updatedAbility.isBattleDamaged = isBattleDamagedValue;
        }

        return updatedAbility;
      }
      return ability;
    });

    dispatch(setAbilities(newAbilities));
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const moveMenuOpen = Boolean(anchorEl);
  const handleMoveMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMoveMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMoveAccodionUp = (abilities: Ability[], index: number) => {
    const newabilities = moveAccordionUp(abilities, index);
    if (newabilities) {
      dispatch(setAbilities(newabilities));
    }
  };

  const handleMoveAccodionDown = (abilities: Ability[], index: number) => {
    const newabilities = moveAccordionDown(abilities, index);
    if (newabilities) {
      dispatch(setAbilities(newabilities));
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
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleAddAbility}>
        <Typography variant="body1">{"Add Ability"}</Typography>
      </Button>
      {undoBar /*Display outside of loop because if there are no elements it won't show.*/}
      {abilities.map((ability, index) => (
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
            <Typography>{ability.name || `Ability ${index + 1}`}</Typography>
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
                  showUndo(abilities, InputType.ability);
                  handleRemoveAbility(index);
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
                    handleMoveAccodionUp(abilities, capturedIndex);
                    handleMoveMenuClose();
                  }}
                >
                  <Typography variant="body2">{"Move Up"}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={(event) => {
                    event.stopPropagation();
                    handleMoveAccodionDown(abilities, capturedIndex);
                    handleMoveMenuClose();
                  }}
                >
                  <Typography variant="body2">{"Move Down"}</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box key={index} sx={{ mb: "16", display: "flex", flexWrap: "wrap" }}>
              {/* Ability name & description */}
              <TextField
                label="Ability name"
                fullWidth
                value={ability.name}
                onChange={(e) => handleInputAbilityChange(index, "name", e.target.value)}
                sx={{ mb: 1, mt: 1 }}
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
                              AbilityIconPath.battleDamagedAbilityPath,
                              true
                            );
                            handleSetWeaponNames();
                          }}
                        />
                      }
                      label={
                        <Box style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={BattleIcon}
                            alt="Battle Damaged Icon"
                            style={{
                              marginRight: 4,
                              width: abilityTypeIconWidth,
                              height: abilityTypeIconHeight,
                            }}
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
                            dispatch(setBattleDamagedWeapon([""]));
                          }}
                        />
                      }
                      label={
                        <Box style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={ControlIcon}
                            alt="Control Icon"
                            style={{
                              marginRight: 4,
                              width: abilityTypeIconWidth,
                              height: abilityTypeIconHeight,
                            }}
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
                              AbilityIconPath.defensiveIconPath,
                              false
                            );
                            dispatch(setBattleDamagedWeapon([""]));
                          }}
                        />
                      }
                      label={
                        <Box style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={DefensiveIcon}
                            alt="Defensive Icon"
                            style={{
                              marginRight: 4,
                              width: abilityTypeIconWidth,
                              height: abilityTypeIconHeight,
                            }}
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
                              AbilityIconPath.movementIconPath,
                              false
                            );
                            dispatch(setBattleDamagedWeapon([""]));
                          }}
                        />
                      }
                      label={
                        <Box style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={MovementIcon}
                            alt="Movement Icon"
                            style={{
                              marginRight: 4,
                              width: abilityTypeIconWidth,
                              height: abilityTypeIconHeight,
                            }}
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
                              AbilityIconPath.OffensiveIconPath,
                              false
                            );
                            dispatch(setBattleDamagedWeapon([""]));
                          }}
                        />
                      }
                      label={
                        <Box style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={OffensiveIcon}
                            alt="Offensive Icon"
                            style={{
                              marginRight: 8,
                              width: abilityTypeIconWidth,
                              height: abilityTypeIconHeight,
                            }}
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
                              AbilityIconPath.rallyingIconPath,
                              false
                            );
                            dispatch(setBattleDamagedWeapon([""]));
                          }}
                        />
                      }
                      label={
                        <Box style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={RallyingIcon}
                            alt="Rallying Icon"
                            style={{
                              marginRight: 8,
                              width: abilityTypeIconWidth,
                              height: abilityTypeIconHeight,
                            }}
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
                              AbilityIconPath.shootingIconPath,
                              false
                            );
                            dispatch(setBattleDamagedWeapon([""]));
                          }}
                        />
                      }
                      label={
                        <Box style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={ShootingIcon}
                            alt="Shooting Icon"
                            style={{
                              marginRight: 8,
                              width: abilityTypeIconWidth,
                              height: abilityTypeIconHeight,
                            }}
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
                              AbilityIconPath.specialIconPath,
                              false
                            );
                            dispatch(setBattleDamagedWeapon([""]));
                          }}
                        />
                      }
                      label={
                        <Box style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={SpecialIcon}
                            alt="Speciald Icon"
                            style={{
                              marginRight: 8,
                              width: abilityTypeIconWidth,
                              height: abilityTypeIconHeight,
                            }}
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
              {ability.isBattleDamaged && (
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
                        error={errors.value}
                        helperText={errors.value ? "Invalid value input" : ""}
                        onChange={(e) => {
                          handleInputChange(e, index, "ability_type_value");
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
              <Divider />
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </AccordionDetails>
  );
}
