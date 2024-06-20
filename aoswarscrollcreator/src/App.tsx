import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import ButtonLayout from "./components/ButtonLayout";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box } from "@mui/material";

import "./fonts/MinionPro.css";
import UnitCard from "./components/UnitCard";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <ResponsiveDrawer />
        <Box sx={{ flexGrow: 1, width: "100%" }}>
          <Grid container spacing={1}>
            <Grid xs={6}>
              <ButtonLayout />
            </Grid>
            <Grid xs={6}>
              <UnitCard />
            </Grid>
          </Grid>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
