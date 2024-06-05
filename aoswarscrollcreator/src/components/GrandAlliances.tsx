import { useState } from "react";
import "./styles.css"; // Import your CSS file for styling
import {
  AccordionDetails,
  Button,
  ButtonGroup,
  Typography,
} from "@mui/material";

const buttonMargin = 0.5;

export default function GrandAlliances() {
  const [selectedAlliance, setSelectedAlliance] = useState<string | null>(null);

  const renderAllianceButtons = () => {
    switch (selectedAlliance) {
      case "Order":
        return (
          <ButtonGroup
            variant="contained"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              mt: 1,
            }}
          >
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Stormcast Eternals"}</Typography>
            </Button>
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Cities of Sigmar"}</Typography>
            </Button>
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Fyreslayers"}</Typography>
            </Button>
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Daughters of Khaine"}</Typography>
            </Button>
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Idoneth Deepkin"}</Typography>
            </Button>
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Kharadron Overlords"}</Typography>
            </Button>
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Lumineth Realmlords"}</Typography>
            </Button>
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Sylvaneth"}</Typography>
            </Button>
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Seraphon"}</Typography>
            </Button>
          </ButtonGroup>
        );
      case "Chaos":
        return (
          <ButtonGroup
            variant="contained"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              mt: 1,
              border: "dashed green",
            }}
          >
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Blades of Khorne"}</Typography>
            </Button>
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Disciples of Tzeench"}</Typography>
            </Button>
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Hedonites of Slaanesh"}</Typography>
            </Button>
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Maggotkin of Nurgle"}</Typography>
            </Button>
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Skaven"}</Typography>
            </Button>
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Slaves to Darkness"}</Typography>
            </Button>
          </ButtonGroup>
        );
      case "Death":
        return (
          <ButtonGroup
            variant="contained"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              mt: 1,
              border: "dashed green",
            }}
          >
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Flesh-Eater Courts"}</Typography>
            </Button>
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Nighthaunt"}</Typography>
            </Button>
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Ossiarch Bonereapers"}</Typography>
            </Button>
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Soulblight Gravelords"}</Typography>
            </Button>
          </ButtonGroup>
        );
      case "Destruction":
        return (
          <ButtonGroup
            variant="contained"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              mt: 1,
              border: "dashed green",
            }}
          >
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Gloomspite Gitz"}</Typography>
            </Button>
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Ogor Mawtribes"}</Typography>
            </Button>
            <Button color="primary" sx={{ m: buttonMargin }}>
              <Typography variant="body2">{"Sons of Behemat"}</Typography>
            </Button>
          </ButtonGroup>
        );
    }
  };

  return (
    <AccordionDetails
      sx={{
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "1.0",
      }}
    >
      <ButtonGroup
        variant="contained"
        sx={{ display: "flex", flexWrap: "wrap" }}
      >
        <Button
          sx={{ m: buttonMargin }}
          onClick={() => setSelectedAlliance("Order")}
        >
          <Typography variant="body1" component="div">
            {"Order"}
          </Typography>
        </Button>
        <Button
          sx={{ m: buttonMargin }}
          onClick={() => setSelectedAlliance("Chaos")}
        >
          <Typography variant="body1" component="div">
            {"Chaos"}
          </Typography>
        </Button>
        <Button
          sx={{ m: buttonMargin }}
          onClick={() => setSelectedAlliance("Death")}
        >
          <Typography variant="body1" component="div">
            {"Death"}
          </Typography>
        </Button>
        <Button
          sx={{ m: buttonMargin }}
          onClick={() => setSelectedAlliance("Destruction")}
        >
          <Typography variant="body1" component="div">
            {"Destruction"}
          </Typography>
        </Button>
      </ButtonGroup>
      {renderAllianceButtons()}
    </AccordionDetails>
  );
}
