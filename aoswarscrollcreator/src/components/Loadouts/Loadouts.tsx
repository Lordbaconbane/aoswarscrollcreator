import { AccordionDetails, TextField } from "@mui/material";

export interface loadoutInfo {
  body: string;
  points: string[];
}

export default function Loadout() {
  return (
    <AccordionDetails sx={{ display: "flex", flexWrap: "wrap", maxWidth: "1.0" }}>
      <TextField label="Loadout information" fullWidth multiline></TextField>
      <TextField label="Info point" fullWidth multiline></TextField>
    </AccordionDetails>
  );
}
