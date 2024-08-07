import { AccordionDetails, MenuItem, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  setWarscrollControl,
  setWarscrollHealth,
  setWarscrollMove,
  setWarscrollName,
  setWarscrollSubtype,
  setWarscrollSave,
} from "./CharacteristicsSlice";
import { validateDiceInput, validateNumericInput } from "../WarscrollCard/WarscrollUtils";
import { useState } from "react";

export default function Characteristics() {
  const dispatch = useDispatch();

  const control = useSelector((state: RootState) => state.characteristics.warscrollControl);
  const health = useSelector((state: RootState) => state.characteristics.warscrollHealth);
  const move = useSelector((state: RootState) => state.characteristics.warscrollMove);
  const save = useSelector((state: RootState) => state.characteristics.warscrollSave);
  const name = useSelector((state: RootState) => state.characteristics.warscrollName);
  const subtype = useSelector((state: RootState) => state.characteristics.warscrollSubtype);

  const [errors, setErrors] = useState({
    move: false,
    health: false,
    control: false,
  });

  const handleNameChange = (event) => {
    const value = event.target.value;
    dispatch(setWarscrollName(value));
  };

  const handleSubtypeChange = (event) => {
    const value = event.target.value;
    dispatch(setWarscrollSubtype(value));
  };

  const handleMoveChange = (event) => {
    const isValid = validateDiceInput(event.target.value);
    console.log("Value: " + event.target.value);
    console.log(isValid);
    if (isValid || !event.target.value.toString()) {
      setErrors((prevErrors) => ({ ...prevErrors, move: false }));
      dispatch(setWarscrollMove(event.target.value.toString().toUpperCase()));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, move: true }));
    }
  };

  const handleHealthChange = (event) => {
    const isValid = validateNumericInput(event.target.value);
    if (isValid || !event.target.value.toString()) {
      setErrors((prevErrors) => ({ ...prevErrors, health: false }));
      dispatch(setWarscrollHealth(event.target.value));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, health: true }));
    }
  };

  const handleControlChange = (event) => {
    const isValid = validateNumericInput(event.target.value);
    if (isValid || !event.target.value.toString()) {
      setErrors((prevErrors) => ({ ...prevErrors, control: false }));
      dispatch(setWarscrollControl(event.target.value));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, control: true }));
    }
  };

  const handleSaveChange = (event) => {
    const value = event.target.value;
    dispatch(setWarscrollSave(value));
  };

  return (
    <AccordionDetails
      sx={{
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "1.0",
        mt: "5",
      }}
    >
      <TextField
        sx={{ m: 1 }}
        id="warscroll-name"
        label="Warscroll Name"
        maxRows={1}
        value={name}
        inputProps={{
          maxLength: 39,
        }}
        fullWidth
        onChange={handleNameChange}
      ></TextField>
      <TextField
        sx={{ m: 1 }}
        id="warscroll-subtype"
        label="Subtype (ie, on horse)"
        value={subtype}
        maxRows={1}
        inputProps={{
          maxLength: 40,
        }}
        fullWidth
        onChange={handleSubtypeChange}
      ></TextField>
      <TextField
        sx={{ m: 1 }}
        id="move"
        label="Move"
        value={move}
        error={errors.move}
        helperText={errors.move ? "Invalid move value" : ""}
        inputProps={{
          maxLength: 6,
          inputMode: "numeric",
        }}
        onChange={handleMoveChange}
      ></TextField>
      <TextField
        sx={{ m: 1 }}
        id="health"
        label="Health"
        value={health}
        error={errors.health}
        helperText={errors.health ? "Invalid health value" : ""}
        inputProps={{
          maxLength: 2,
          inputMode: "numeric",
          pattern: "[0-9]*",
        }}
        onKeyDown={(e) => {
          if (["e", "E", "-", ".", "+"].includes(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={handleHealthChange}
      ></TextField>
      <TextField
        sx={{ m: 1 }}
        id="control"
        label="Control"
        value={control}
        error={errors.control}
        helperText={errors.control ? "Invalid control value" : ""}
        inputProps={{
          maxLength: 2,
          inputMode: "numeric",
          pattern: "[0-9]*",
        }}
        onKeyDown={(e) => {
          if (["e", "E", "-", ".", "+"].includes(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={handleControlChange}
      ></TextField>
      <TextField
        onChange={handleSaveChange}
        sx={{ m: 1, width: "10ch" }}
        select
        value={save}
        id="save"
        label="Save"
      >
        {["1+", "2+", "3+", "4+", "5+", "6+", "-"].map((num) => (
          <MenuItem key={num} value={num}>
            {num}
          </MenuItem>
        ))}
      </TextField>
    </AccordionDetails>
  );
}
