import { AccordionDetails, TextField, Button, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addLoadoutPoint, removeLoadoutPoint, setLoadoutBody, setLoadoutPoint } from "./LoadoutSlice";

export interface loadoutInfo {
  body: string;
  points: string[];
}

export default function Loadout() {
  const dispatch = useDispatch();

  const loadoutBody = useSelector((state: RootState) => state.loadout.body);
  const loadoutPoints = useSelector((state: RootState) => state.loadout.points);

  const handleSetLoadoutBody = (value: string) => {
    dispatch(setLoadoutBody(value));
  };

  const handleAddLoadoutPoint = () => {
    const newPoint = ""; // Replace with the logic to generate a new point if necessary
    dispatch(addLoadoutPoint(newPoint));
  };

  const handleRemoveLoadoutPoint = (index: number) => {
    dispatch(removeLoadoutPoint(index));
  };

  const handleInputChange = (index: number, value: string) => {
    dispatch(setLoadoutPoint({ index, value }));
  };

  return (
    <AccordionDetails sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", maxWidth: "100%" }}>
      <TextField
        label="Loadout information"
        fullWidth
        value={loadoutBody}
        multiline
        onChange={(e) => handleSetLoadoutBody(e.target.value)}
      ></TextField>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mb: 2, mt: 1 }}
        onClick={handleAddLoadoutPoint}
      >
        <Typography variant="body1">{"Add new point"}</Typography>
      </Button>
      {loadoutPoints.map((_point, index) => (
        <Box key={index} sx={{ flexWrap: "wrap" }}>
          <TextField
            label="Info point (auto adds bullet point)"
            value={loadoutPoints[index]}
            fullWidth
            sx={{ mr: 1 }}
            multiline
            onChange={(e) => handleInputChange(index, e.target.value)}
          ></TextField>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleRemoveLoadoutPoint(index)}
            sx={{ mb: 1 }}
          >
            <Typography variant="body1">{"Remove Point"}</Typography>
          </Button>
        </Box>
      ))}
    </AccordionDetails>
  );
}
