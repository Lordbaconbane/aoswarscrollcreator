import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import ButtonLayout from "./components/ButtonLayout";

import "./fonts/MinionPro.css";

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
        <ButtonLayout />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
