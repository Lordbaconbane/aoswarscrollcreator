import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export default function Legal() {
  return (
    <Box component="main">
      <AppBar position="sticky" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar sx={{}}>
          <Typography
            variant="body2"
            component="div"
            alignItems="center"
            bgcolor={"#201c1c"}
            fontFamily={"Minion Pro"}
            sx={{ border: "2px solid grey", p: 1 }}
          >
            {`
        This website is a fan-made, UNOFFICIAL project. It is not affiliated with, endorsed, sponsored, 
        or approved by Games Workshop. All content on 
        this site is intended for non-commercial, 
        no-charge digital distribution only.
      `}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
