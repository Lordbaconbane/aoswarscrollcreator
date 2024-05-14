// import GrandAlliances from "./components/GrandAlliances";
// import MuiButton from "./components/MuiButton";
// import { Button } from "@mui/material/";
import "./App.css";
import { Box } from "@mui/material/";
import { MuiNavbar } from "./components/MuiNavbar";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Box
          sx={{
            width: "10vm",
            display: "flex",
            justifyContent: "left",
          }}
        >
          <MuiNavbar />

          {/* <GrandAlliances />
      <MuiButton />
      <Button variant="contained">Hello World</Button>  */}
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
