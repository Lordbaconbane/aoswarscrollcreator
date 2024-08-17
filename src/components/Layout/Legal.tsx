import { Box, AppBar, Toolbar, Typography, Link } from "@mui/material";

export default function Legal() {
  return (
    <Box component="main">
      <AppBar position="sticky" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Typography
            variant="body2"
            component="div"
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
            <br />
            <Link
              href="https://readymag.website/u4146278660/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              color="secondary"
              underline="hover"
            >
              <Typography variant="body2" component="div" bgcolor={"#201c1c"} fontFamily={"Minion Pro"}>
                {"Seraphon banner by Faith. Check out her portfolio here! "}
              </Typography>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
