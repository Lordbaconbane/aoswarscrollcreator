import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Shield, Home, RestartAlt, Download, GitHub, CloudDownload, CloudUpload } from "@mui/icons-material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import ExportData from "./HandleData/ExportData";
import { ImportData } from "./HandleData/ImportData";

import { initDownload } from "./WarscrollCard/WarscrollCardSlice";
import { useDispatch } from "react-redux";
import ResetWarscroll from "./HandleData/ResetWarscroll";

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const [isClosing, setIsClosing] = React.useState(false);

  const dispatch = useDispatch();

  const handleDownload = () => {
    dispatch(initDownload()); // Dispatch the downloadImage action
  };

  const handleToggleDrawer = () => {
    console.log("toggle Drawer Selected");
    setIsClosing((o) => !o);
  };

  const handleOpenGithub = () => {
    window.open("https://github.com/Lordbaconbane");
  };

  const exportData = ExportData(); // Get the exportData function from the custom hook

  const { importData, fileInputRef, handleFileChange } = ImportData();
  const handleDownloadClick = (index: number) => {
    if (index == 0) {
      exportData();
    } else if (index == 1) {
      importData(); // Trigger the file input dialog
    }
  };

  const resetWarscroll = ResetWarscroll();
  const handleResetClick = () => {
    resetWarscroll();
  };

  //const handleWarscrollReset = () => {};

  const MenuIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg>
    );
  };

  const drawer = (
    <Box>
      {/* Top section of list */}
      <Divider />
      <List>
        {["Warscroll Designer", "Spearhead"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <Home /> : <Shield />}</ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  sx: {
                    fontSize: { xs: "0.875rem", sm: "1rem" }, // Smaller font size on mobile
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        {["Download Warscroll Data", "Import Warscroll Data"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleDownloadClick(index)}>
              <ListItemIcon>
                {index % 2 === 0 ? <CloudDownload /> : <CloudUpload> </CloudUpload>}
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  sx: {
                    fontSize: { xs: "0.875rem", sm: "1rem" }, // Smaller font size on mobile
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".json"
        onChange={handleFileChange}
      />
      <Divider />

      {/* Bottom section of list */}
      <List>
        {["Reset Warscroll"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleResetClick()}>
              <ListItemIcon>
                {index % 2 === 0 ? <RestartAlt sx={{ color: "red" }} /> : <RestartAlt />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  sx: {
                    fontSize: { xs: "0.875rem", sm: "1rem" }, // Smaller font size on mobile
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        position="absolute"
        sx={{
          mr: "2s",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 48, sm: 64 }, // Smaller toolbar height on mobile
            px: { xs: 1, sm: 2 }, // Smaller padding on mobile
          }}
        >
          {/* Menu icon */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            size="large"
            edge="start"
            onClick={handleToggleDrawer}
            sx={{}}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontSize: { xs: "1rem", sm: "1.5rem" }, // Smaller font size on mobile
            }}
          >
            {"AoS Warscroll Creator "}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontStyle: "italic",
              whiteSpace: "pre-wrap",
              fontSize: { xs: "0.5rem", sm: "1.25rem" }, // Smaller font size on mobile
            }}
          >
            {" by Lordbaconbane"}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            size="large"
            sx={{ justifyContent: "left", ml: 1 }}
            onClick={handleOpenGithub}
          >
            <GitHub />
          </IconButton>
          <Box
            sx={{
              whiteSpace: "pre-wrap",
              flexGrow: 1,
            }}
          ></Box>

          {/* PDF related icons */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            size="large"
            sx={{ justifyContent: "right" }}
            onClick={handleDownload}
          >
            <Download />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Box with drawer */}
      <Box
        component="nav"
        sx={{
          width: {},
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="persistent"
          sx={{
            display: { xs: 12, sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              mt: "65px",
            },
          }}
          open={isClosing}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
