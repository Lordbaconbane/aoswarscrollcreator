// import GrandAlliances from "./components/GrandAlliances";
// import MuiButton from "./components/MuiButton";
// import { Button } from "@mui/material/";
import "./App.css";
import { Box } from "@mui/material/";
import { MuiNavbar } from "./components/MuiNavbar";

function App() {
  return (
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
  );
}

export default App;
