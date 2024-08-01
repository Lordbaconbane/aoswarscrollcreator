import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box } from "@mui/material";

import "../public/fonts/Minion Pro Regular.ttf";
import WarscrollCard from "./components/WarscrollCard/WarscrollCard";
import { store } from "./store/store";
import { Provider } from "react-redux";
import AccordianLayout from "./components/AccordianLayout";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Provider store={store}>
          <ResponsiveDrawer />
          <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Grid container spacing={1}>
              <Grid xs={6}>
                <AccordianLayout />
              </Grid>
              <Grid xs={6}>
                <WarscrollCard />
              </Grid>
            </Grid>
          </Box>
        </Provider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
