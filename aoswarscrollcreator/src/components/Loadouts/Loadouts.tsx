import { AccordionDetails, TextField, Button, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addLoadoutPoint } from "./LoadoutSlice";

export interface loadoutInfo {
  body: string;
  points: string[];
}

export default function Loadout() {
  const dispatch = useDispatch();

  const loadoutPoints = useSelector((state: RootState) => state.loadout.points);

  const handleAddLoadoutPoint = () => {
    const newPoint = ""; // Replace with the logic to generate a new point if necessary
    dispatch(addLoadoutPoint(newPoint));
  };

  return (
    <AccordionDetails
      sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", maxWidth: "100%" }}
    >
      <TextField label="Loadout information" fullWidth multiline></TextField>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mb: 2, mt: 1 }}
        onClick={handleAddLoadoutPoint}
      >
        <Typography variant="body1">{"Add new point"}</Typography>
      </Button>
      {loadoutPoints.map((point, index) => (
        <Box key={index} sx={{ flexWrap: "wrap" }}>
          <TextField
            label="Info point (auto adds bullet point)"
            value={point[index]}
            fullWidth
            sx={{ mr: 1 }}
            multiline
          ></TextField>
          <Button
            variant="contained"
            color="secondary"
            //onClick={() => handleRemoveMeleeWeapon(index)}
            sx={{ mb: 1 }}
          >
            <Typography variant="body1">{"Remove Point"}</Typography>
          </Button>
        </Box>
      ))}
    </AccordionDetails>
  );
}
