import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import ButtonLayout from "./components/ButtonLayout";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box } from "@mui/material";

import "./fonts/MinionPro.css";
import WarscrollCard from "./components/WarscrollCard/WarscrollCard";
import { store } from "./store/store";
import { Provider } from "react-redux";

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
                <ButtonLayout />
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
