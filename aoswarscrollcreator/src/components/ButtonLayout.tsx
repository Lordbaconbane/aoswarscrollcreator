import { Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import GrandAlliances from "./GrandAlliances";

import { createTheme, ThemeProvider } from "@mui/material";

import HandshakeIcon from "@mui/icons-material/Handshake";

const theme = createTheme({
  typography: {
    fontFamily: "Minion Pro, Arial, sans-serif",
  },
});

const accordianWidth = 1;

export default function ButtonLayout() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 0,
        p: 2,
        marginTop: 7,
        border: "dashed red",
        width: 1,
      }}
    >
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
      </Accordion>
    </Box>
  );
}
