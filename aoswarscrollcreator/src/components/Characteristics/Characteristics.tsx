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

export default function Characteristics() {
  const dispatch = useDispatch();

  const saveChar = useSelector(
    (state: RootState) => state.characteristics.warscrollSave
  );

  const handleNameChange = (event) => {
    const value = event.target.value;
    dispatch(setWarscrollName(value));
  };

  const handleSubtypeChange = (event) => {
    const value = event.target.value;
    dispatch(setWarscrollSubtype(value));
  };

  const handleMoveChange = (event) => {
    const value = event.target.value;
    dispatch(setWarscrollMove(value));
  };

  const handleHealthChange = (event) => {
    const value = event.target.value;
    dispatch(setWarscrollHealth(value));
  };

  const handleControlChange = (event) => {
    const value = event.target.value;
    dispatch(setWarscrollControl(value));
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
        multiline
        maxRows={2}
        fullWidth
        onChange={handleNameChange}
      ></TextField>
      <TextField
        sx={{ m: 1 }}
        id="warscroll-subtype"
        label="Subtype (ie, on horse)"
        multiline
        maxRows={2}
        fullWidth
        onChange={handleSubtypeChange}
      ></TextField>
      <TextField
        sx={{ m: 1 }}
        id="move"
        label="Move"
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
        onChange={handleMoveChange}
      ></TextField>
      <TextField
        sx={{ m: 1 }}
        id="health"
        label="Health"
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
        value={saveChar}
        id="save"
        label="Save"
      >
        {["1", "2", "3", "4", "5", "6", "-"].map((num) => (
          <MenuItem key={num} value={num}>
            {num}
          </MenuItem>
        ))}
      </TextField>
    </AccordionDetails>
  );
}
