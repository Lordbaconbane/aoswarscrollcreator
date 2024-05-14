import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  List,
  Drawer,
} from "@mui/material";
import * as React from "react";

import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export const MenuIcon = () => {
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

/**
 * The app bar that appears on top of the page
 */
export const MuiNavbar = () => {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    if (open == true) {
      console.log("NewOpen: ", open);
      setOpen(false);
    } else {
      console.log("NewOpen: ", open);
      setOpen(true);
    }
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        height: 200,
        position: "relative",
        justifyContent: "flex-end",
        margin: 0,
        variant: "persistent",
        paddingTop: "25%",
      }}
      role="presentation"
      onClick={toggleDrawer}
    >
      <List>
        {["wfwef"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Hue"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="App">
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div">
            {"AoS Warscroll Creator "}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontStyle: "italic" }}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {" by Lordbaconbane"}
          </Typography>
        </Toolbar>
      </AppBar>{" "}
      <Drawer
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 200,
        }}
        open={open}
        onClose={toggleDrawer}
      >
        <Divider> {DrawerList}</Divider>
      </Drawer>
    </div>
  );
};
