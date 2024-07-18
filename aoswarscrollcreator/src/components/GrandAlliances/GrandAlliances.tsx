import { useState } from "react";
import { AccordionDetails, Button, ButtonGroup, Typography } from "@mui/material";
import { setFactionName, setFactionTemplate, setFactionWeaponBanner } from "./GrandAlliancsSlice";
import { useDispatch } from "react-redux";
import { FactionBanners, FactionTemplates } from "./FactionTemplateLinks";

const buttonMargin = 0.5;

export default function GrandAlliances() {
  const [selectedAlliance, setSelectedAlliance] = useState<string | null>(null);
  const dispatch = useDispatch();
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
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName("Stormcast Eternals"));
                dispatch(setFactionTemplate(FactionTemplates.StormcastEternals));
              }}
            >
              <Typography variant="body2">{"Stormcast Eternals"}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Cities of Sigmar"))}
            >
              <Typography variant="body2">{"Cities of Sigmar"}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Fyreslayers"))}
            >
              <Typography variant="body2">{"Fyreslayers"}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Daughters of Khaine"))}
            >
              <Typography variant="body2">{"Daughters of Khaine"}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Idoneth Deepkin"))}
            >
              <Typography variant="body2">{"Idoneth Deepkin"}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Kharadron Overlords"))}
            >
              <Typography variant="body2">{"Kharadron Overlords"}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Lumineth Realmlords"))}
            >
              <Typography variant="body2">{"Lumineth Realmlords"}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Sylvaneth"))}
            >
              <Typography variant="body2">{"Sylvaneth"}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName("Seraphon"));
                dispatch(setFactionTemplate(FactionTemplates.Seraphon));
                dispatch(setFactionWeaponBanner(FactionBanners.Seraphon));
              }}
            >
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
            }}
          >
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Blades of Khorne"))}
            >
              <Typography variant="body2">{"Blades of Khorne"}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Disciples of Tzeench"))}
            >
              <Typography variant="body2">{"Disciples of Tzeench"}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Hedonites of Slaanesh"))}
            >
              <Typography variant="body2">{"Hedonites of Slaanesh"}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Maggotkin of Nurgle"))}
            >
              <Typography variant="body2">{"Maggotkin of Nurgle"}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Skaven"))}
            >
              <Typography variant="body2">{"Skaven"}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Slaves to Darkness"))}
            >
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
            }}
          >
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Flesh-Eater Courts"))}
            >
              <Typography variant="body2">{"Flesh-Eater Courts"}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Nighthaunt"))}
            >
              <Typography variant="body2">{"Nighthaunt"}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Ossiarch Bonereapers"))}
            >
              <Typography variant="body2">{"Ossiarch Bonereapers"}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Soulblight Gravelords"))}
            >
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
            }}
          >
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Gloomspite Gitz"))}
            >
              <Typography variant="body2">{"Gloomspite Gitz"}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Ogor Mawtribes"))}
            >
              <Typography variant="body2">{"Ogor Mawtribes"}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName("Sons of Behemat"))}
            >
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
      <ButtonGroup variant="contained" sx={{ display: "flex", flexWrap: "wrap" }}>
        <Button sx={{ m: buttonMargin }} onClick={() => setSelectedAlliance("Order")}>
          <Typography variant="body1" component="div">
            {"Order"}
          </Typography>
        </Button>
        <Button sx={{ m: buttonMargin }} onClick={() => setSelectedAlliance("Chaos")}>
          <Typography variant="body1" component="div">
            {"Chaos"}
          </Typography>
        </Button>
        <Button sx={{ m: buttonMargin }} onClick={() => setSelectedAlliance("Death")}>
          <Typography variant="body1" component="div">
            {"Death"}
          </Typography>
        </Button>
        <Button sx={{ m: buttonMargin }} onClick={() => setSelectedAlliance("Destruction")}>
          <Typography variant="body1" component="div">
            {"Destruction"}
          </Typography>
        </Button>
      </ButtonGroup>
      {renderAllianceButtons()}
    </AccordionDetails>
  );
}
