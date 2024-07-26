import { Box, Typography } from "@mui/material";

const Legal: React.FC = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 0,
        p: 2,
        marginTop: 1,
        width: 0.5,
      }}
    >
      <Typography variant="body1" component="div" fontFamily={"Minion Pro"}>
        {`
        This website is a fan-made, UNOFFICIAL project. 
        It is not affiliated with, endorsed, sponsored, 
        or approved by Games Workshop. All content on 
        this site is intended for non-commercial, 
        no-charge digital distribution only.
      `}
      </Typography>
    </Box>
  );
};

export default Legal;
