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
import { Shield, Home, RestartAlt, Download } from "@mui/icons-material";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { downloadImage } from "./UnitCard/UnitCardSlice";
import { useDispatch } from "react-redux";

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const dispatch = useDispatch();

  const handleDownload = () => {
    dispatch(downloadImage()); // Dispatch the downloadImage action
  };

  const handleToggleDrawer = () => {
    console.log("toggle Drawer Selected");
    setIsClosing((o) => !o);
  };

  const handleDrawerClose = () => {
    console.log("Handle Drawer");
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const MenuIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#000000"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg>
    );
  };

  const drawer = (
    <div>
      {/* Top section of list */}
      <Divider />
      <List>
        {["Warscroll Designer", "Spearhead"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Home /> : <Shield />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      {/* Bottom section of list */}
      <List>
        {["Reset Warscroll"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <RestartAlt /> : <RestartAlt />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
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
        <Toolbar>
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
          <Typography variant="h5" component="div">
            {"AoS Warscroll Creator "}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontStyle: "italic" }}
            style={{
              whiteSpace: "pre-wrap",
              flexGrow: 1,
            }}
          >
            {" by Lordbaconbane"}
          </Typography>
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
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="persistent"
          sx={{
            display: { xs: "none", sm: "block" },
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
