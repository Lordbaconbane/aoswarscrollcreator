import { useState } from "react";
import { AccordionDetails, Button, ButtonGroup, Typography } from "@mui/material";
import { setFactionName, setFactionTemplate, setFactionWeaponBanner } from "./GrandAlliancsSlice";
import { useDispatch } from "react-redux";
import { FactionBanners, FactionNames, FactionTemplates } from "./FactionTemplateLinks";

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
                dispatch(setFactionName(FactionNames.StormcastEternals));
                dispatch(setFactionTemplate(FactionTemplates.StormcastEternals));
                dispatch(setFactionWeaponBanner(FactionBanners.StormcastEternals));
              }}
            >
              <Typography variant="body2">{FactionNames.StormcastEternals}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.CitiesOfSigmar))}
            >
              <Typography variant="body2">{FactionNames.CitiesOfSigmar}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.Fyreslayers))}
            >
              <Typography variant="body2">{FactionNames.Fyreslayers}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.DaughtersOfKhaine))}
            >
              <Typography variant="body2">{FactionNames.DaughtersOfKhaine}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.IdonethDeepkin))}
            >
              <Typography variant="body2">{FactionNames.IdonethDeepkin}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.KharadronOverlords))}
            >
              <Typography variant="body2">{FactionNames.KharadronOverlords}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.LuminethRealmLords))}
            >
              <Typography variant="body2">{FactionNames.LuminethRealmLords}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.Sylvaneth))}
            >
              <Typography variant="body2">{FactionNames.Sylvaneth}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.Seraphon));
                dispatch(setFactionTemplate(FactionTemplates.Seraphon));
                dispatch(setFactionWeaponBanner(FactionBanners.Seraphon));
              }}
            >
              <Typography variant="body2">{FactionNames.Seraphon}</Typography>
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
              onClick={() => dispatch(setFactionName(FactionNames.BeastsOfChaos))}
            >
              <Typography variant="body2">{FactionNames.BeastsOfChaos}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.BladesOfKhorne));
                dispatch(setFactionTemplate(FactionTemplates.BladesOfKhorne));
                dispatch(setFactionWeaponBanner(FactionBanners.BladesOfKhorne));
              }}
            >
              <Typography variant="body2">{FactionNames.BladesOfKhorne}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.DisciplesOfTzeench))}
            >
              <Typography variant="body2">{FactionNames.DisciplesOfTzeench}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.HedonitesOfSlaanesh));
                dispatch(setFactionTemplate(FactionTemplates.HedonitesOfSlaanesh));
                dispatch(setFactionWeaponBanner(FactionBanners.HedonitesOfSlaanesh));
              }}
            >
              <Typography variant="body2">{FactionNames.HedonitesOfSlaanesh}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.MaggotkinOfNurgle))}
            >
              <Typography variant="body2">{FactionNames.MaggotkinOfNurgle}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.Skaven))}
            >
              <Typography variant="body2">{FactionNames.Skaven}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.SlavesToDarkness))}
            >
              <Typography variant="body2">{FactionNames.SlavesToDarkness}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.SonsOfHashut))}
            >
              <Typography variant="body2">{FactionNames.SonsOfHashut}</Typography>
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
              onClick={() => dispatch(setFactionName(FactionNames.FleshEaterCourts))}
            >
              <Typography variant="body2">{FactionNames.FleshEaterCourts}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.Nighthaunt))}
            >
              <Typography variant="body2">{FactionNames.Nighthaunt}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.OssiarchBonereapers))}
            >
              <Typography variant="body2">{FactionNames.OssiarchBonereapers}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.SoulblightGravelords))}
            >
              <Typography variant="body2">{FactionNames.SoulblightGravelords}</Typography>
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
              onClick={() => dispatch(setFactionName(FactionNames.Bonesplittaz))}
            >
              <Typography variant="body2">{FactionNames.Bonesplittaz}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.OrrukWarclans))}
            >
              <Typography variant="body2">{FactionNames.OrrukWarclans}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.GloomspiteGitz))}
            >
              <Typography variant="body2">{FactionNames.GloomspiteGitz}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.OgorMawtribes))}
            >
              <Typography variant="body2">{FactionNames.OgorMawtribes}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => dispatch(setFactionName(FactionNames.SonsOfBehemat))}
            >
              <Typography variant="body2">{FactionNames.SonsOfBehemat}</Typography>
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
