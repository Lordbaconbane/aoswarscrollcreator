import {
  AccordionDetails,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";
import React from "react";

export default function Keywords() {
  const [isWard, setWard] = React.useState(false);
  const handleWardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWard(event.target.checked);
  };

  return (
    <AccordionDetails
      sx={{ display: "flex", flexWrap: "wrap", maxWidth: "1.0" }}
    >
      <Box sx={{ display: "flex" }}>
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">Keyword Roles</FormLabel>
          <FormGroup>
            <FormControlLabel
              sx={{ mb: -1 }}
              control={<Checkbox name="hero" />}
              label="Hero"
            />
            <FormControlLabel
              sx={{ mb: -1 }}
              control={<Checkbox name="unique" />}
              label="Unique"
            />
            <FormControlLabel
              sx={{ mb: -1 }}
              control={<Checkbox name="wizard" />}
              label="Wizard"
            />
          </FormGroup>
        </FormControl>
        <FormControl sx={{ ml: 2 }}>
          <FormLabel component="legend">Keyword Abilities</FormLabel>
          <FormGroup>
            <FormControlLabel
              sx={{ mb: -1 }}
              control={<Checkbox name="fly" />}
              label="Fly"
            />
            <FormControlLabel
              sx={{ mb: -1 }}
              control={
                <Checkbox
                  name="ward"
                  checked={isWard}
                  onChange={handleWardChange}
                />
              }
              label="Ward"
            />
            {isWard && (
              <TextField
                sx={{ m: 1, width: "10ch" }}
                select
                id="ward"
                label="Ward"
              >
                {["2", "3", "4", "5", "6"].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </TextField>
            )}
            <FormControlLabel
              sx={{ mb: -1 }}
              control={<Checkbox name="champion" />}
              label="Champion"
            />
            <FormControlLabel
              sx={{ mb: -1 }}
              control={<Checkbox name="standard" />}
              label="Standard"
            />
            <FormControlLabel
              control={<Checkbox name="musician" />}
              label="Musician"
            />
          </FormGroup>
        </FormControl>
      </Box>
    </AccordionDetails>
  );
}
