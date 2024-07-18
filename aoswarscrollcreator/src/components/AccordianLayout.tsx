import { Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import GrandAlliances from "./GrandAlliances/GrandAlliances";
import { createTheme, ThemeProvider } from "@mui/material";
import HandshakeIcon from "@mui/icons-material/Handshake";
import Characteristics from "./Characteristics/Characteristics";
import Keywords from "./Keywords/Keywords";
import MeleeWeapons from "./Weapons/MeleeWeapons";
import RangedWeapons from "./Weapons/RangedWeapons";
import Abilities from "./Abilities/Abilities";
import Loadout from "./Loadouts/Loadouts";
const theme = createTheme({
  typography: {
    fontFamily: "Minion Pro, Arial, sans-serif",
  },
});

const accordianWidth = 1;

export default function AccordianLayout() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 0,
        p: 2,
        marginTop: 7,
        width: 1,
      }}
    >
      {/*Faction Select*/}
      <Accordion sx={{ maxWidth: accordianWidth }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <HandshakeIcon sx={{ mr: 1 }}> </HandshakeIcon>
          <ThemeProvider theme={theme}>
            <Typography variant="h6" component="div">
              {"Faction Selection"}
            </Typography>
          </ThemeProvider>
        </AccordionSummary>
        <GrandAlliances />
      </Accordion>
      {/*Characteristics*/}
      <Accordion sx={{ maxWidth: accordianWidth }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h6" component="div">
              {"Characteristics"}
            </Typography>
          </ThemeProvider>
        </AccordionSummary>
        <Characteristics />
      </Accordion>
      {/*Ranged Weapons*/}
      <Accordion sx={{ maxWidth: accordianWidth }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h6" component="div">
              {"Ranged Weapons"}
            </Typography>
          </ThemeProvider>
        </AccordionSummary>
        <RangedWeapons />
      </Accordion>
      {/*Melee Weapons*/}
      <Accordion sx={{ maxWidth: accordianWidth }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h6" component="div">
              {"Melee Weapons"}
            </Typography>
          </ThemeProvider>
        </AccordionSummary>
        <MeleeWeapons />
      </Accordion>
      {/*Loadout*/}
      <Accordion sx={{ maxWidth: accordianWidth }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h6" component="div">
              {"Unit Loadout & Info"}
            </Typography>
          </ThemeProvider>
        </AccordionSummary>
        <Loadout />
      </Accordion>
      {/*Abilities*/}
      <Accordion sx={{ maxWidth: accordianWidth }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h6" component="div">
              {"Abilities"}
            </Typography>
          </ThemeProvider>
        </AccordionSummary>
        <Abilities />
      </Accordion>
      {/*Keywords*/}
      <Accordion sx={{ maxWidth: accordianWidth }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h6" component="div">
              {"Keywords"}
            </Typography>
          </ThemeProvider>
        </AccordionSummary>
        <Keywords />
      </Accordion>
    </Box>
  );
}
