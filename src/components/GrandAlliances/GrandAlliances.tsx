import { useState } from "react";
import { AccordionDetails, Button, ButtonGroup, TextField, Typography } from "@mui/material";
import {
  setFactionName,
  setFactionTemplate,
  setFactionWeaponBanner,
  setCustomFactionName,
} from "./GrandAlliancsSlice";
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
              onClick={() => {
                dispatch(setFactionName(FactionNames.CitiesOfSigmar));
                dispatch(setFactionTemplate(FactionTemplates.CitiesOfSigmar));
                dispatch(setFactionWeaponBanner(FactionBanners.CitiesOfSigmar));
              }}
            >
              <Typography variant="body2">{FactionNames.CitiesOfSigmar}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.Fyreslayers));
                dispatch(setFactionTemplate(FactionTemplates.Fyreslayers));
                dispatch(setFactionWeaponBanner(FactionBanners.Fyreslayers));
              }}
            >
              <Typography variant="body2">{FactionNames.Fyreslayers}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.DaughtersOfKhaine));
                dispatch(setFactionTemplate(FactionTemplates.DaughtersOfKhaine));
                dispatch(setFactionWeaponBanner(FactionBanners.DaughtersOfKhaine));
              }}
            >
              <Typography variant="body2">{FactionNames.DaughtersOfKhaine}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.IdonethDeepkin));
                dispatch(setFactionTemplate(FactionTemplates.IdonethDeepkin));
                dispatch(setFactionWeaponBanner(FactionBanners.IdonethDeepkin));
              }}
            >
              <Typography variant="body2">{FactionNames.IdonethDeepkin}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.KharadronOverlords));
                dispatch(setFactionTemplate(FactionTemplates.KharadronOverlords));
                dispatch(setFactionWeaponBanner(FactionBanners.KharadronOverlords));
              }}
            >
              <Typography variant="body2">{FactionNames.KharadronOverlords}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.LuminethRealmLords));
                dispatch(setFactionTemplate(FactionTemplates.LuminethRealmLords));
                dispatch(setFactionWeaponBanner(FactionBanners.LuminethRealmLords));
              }}
            >
              <Typography variant="body2">{FactionNames.LuminethRealmLords}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.Sylvaneth));
                dispatch(setFactionTemplate(FactionTemplates.Sylvaneth));
                dispatch(setFactionWeaponBanner(FactionBanners.Sylvaneth));
              }}
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
              onClick={() => {
                dispatch(setFactionName(FactionNames.BeastsOfChaos));
                dispatch(setFactionTemplate(FactionTemplates.BeastsOfChaos));
                dispatch(setFactionWeaponBanner(FactionBanners.BeastsOfChaos));
              }}
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
              onClick={() => {
                dispatch(setFactionName(FactionNames.DisciplesOfTzeench));
                dispatch(setFactionTemplate(FactionTemplates.DisciplesOfTzeench));
                dispatch(setFactionWeaponBanner(FactionBanners.DisciplesOfTzeench));
              }}
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
              onClick={() => {
                dispatch(setFactionName(FactionNames.MaggotkinOfNurgle));
                dispatch(setFactionTemplate(FactionTemplates.MaggotkinOfNurgle));
                dispatch(setFactionWeaponBanner(FactionBanners.MaggotkinOfNurgle));
              }}
            >
              <Typography variant="body2">{FactionNames.MaggotkinOfNurgle}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.Skaven));
                dispatch(setFactionTemplate(FactionTemplates.Skaven));
                dispatch(setFactionWeaponBanner(FactionBanners.Skaven));
              }}
            >
              <Typography variant="body2">{FactionNames.Skaven}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.SlavesToDarkness));
                dispatch(setFactionTemplate(FactionTemplates.SlavesToDarkness));
                dispatch(setFactionWeaponBanner(FactionBanners.SlavesToDarkness));
              }}
            >
              <Typography variant="body2">{FactionNames.SlavesToDarkness}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.SonsOfHashut));
                dispatch(setFactionTemplate(FactionTemplates.SonsOfHashut));
                dispatch(setFactionWeaponBanner(FactionBanners.SonsOfHashut));
              }}
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
              onClick={() => {
                dispatch(setFactionName(FactionNames.FleshEaterCourts));
                dispatch(setFactionTemplate(FactionTemplates.FleshEaterCourts));
                dispatch(setFactionWeaponBanner(FactionBanners.FleshEaterCourts));
              }}
            >
              <Typography variant="body2">{FactionNames.FleshEaterCourts}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.Nighthaunt));
                dispatch(setFactionTemplate(FactionTemplates.Nighthaunt));
                dispatch(setFactionWeaponBanner(FactionBanners.Nighthaunt));
              }}
            >
              <Typography variant="body2">{FactionNames.Nighthaunt}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.OssiarchBonereapers));
                dispatch(setFactionTemplate(FactionTemplates.OssiarchBonereapers));
                dispatch(setFactionWeaponBanner(FactionBanners.Nighthaunt));
              }}
            >
              <Typography variant="body2">{FactionNames.OssiarchBonereapers}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.SoulblightGravelords));
                dispatch(setFactionTemplate(FactionTemplates.SoulblightGravelords));
                dispatch(setFactionWeaponBanner(FactionBanners.FleshEaterCourts));
              }}
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
              onClick={() => {
                dispatch(setFactionName(FactionNames.Bonesplittaz));
                dispatch(setFactionTemplate(FactionTemplates.Bonesplittaz));
                dispatch(setFactionWeaponBanner(FactionBanners.OrrukWarclans));
              }}
            >
              <Typography variant="body2">{FactionNames.Bonesplittaz}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.OrrukWarclans));
                dispatch(setFactionTemplate(FactionTemplates.OrrukWarclans));
                dispatch(setFactionWeaponBanner(FactionBanners.OrrukWarclans));
              }}
            >
              <Typography variant="body2">{FactionNames.OrrukWarclans}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.GloomspiteGitz));
                dispatch(setFactionTemplate(FactionTemplates.GloomspiteGitz));
                dispatch(setFactionWeaponBanner(FactionBanners.GloomspiteGitz));
              }}
            >
              <Typography variant="body2">{FactionNames.GloomspiteGitz}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.OgorMawtribes));
                dispatch(setFactionTemplate(FactionTemplates.OgorMawtribes));
                dispatch(setFactionWeaponBanner(FactionBanners.OgorMawtribes));
              }}
            >
              <Typography variant="body2">{FactionNames.OgorMawtribes}</Typography>
            </Button>
            <Button
              color="primary"
              sx={{ m: buttonMargin }}
              onClick={() => {
                dispatch(setFactionName(FactionNames.SonsOfBehemat));
                dispatch(setFactionTemplate(FactionTemplates.SonsOfBehemat));
                dispatch(setFactionWeaponBanner(FactionBanners.SonsOfBehemat));
              }}
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
      <TextField
        label="Enter custom faction name (Leave blank to use default faction name)"
        fullWidth
        inputProps={{ maxLength: 45 }}
        onChange={(e) => dispatch(setCustomFactionName(e.target.value))}
        sx={{ mt: 1 }}
      ></TextField>
      {renderAllianceButtons()}
    </AccordionDetails>
  );
}
