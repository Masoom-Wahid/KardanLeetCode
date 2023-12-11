import React from "react";
import { Box, Grid, IconButton } from "@mui/material";
import ChallengeCardMolecule from "../Molecules/ChallengeCardMolecule";
import Typography from "../Atoms/TypographyAtom";
import { styled } from "@mui/material/styles";
import Logo from "../../assets/logo.png"; // Path to your logo image

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
  textShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  fontSize: "2rem",
  marginBottom: theme.spacing(2),
}));

const PointsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: theme.palette.primary.light,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const LogoIcon = styled("img")({
  width: "50px",
  height: "50px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "rotate(20deg)",
  },
});

const ChallengesListOrganism = ({ challenges }) => {
  return (
    <Box
      padding={2}
      sx={{ maxWidth: "100%", overflow: "hidden", position: "relative" }}
    >
      <IconButton sx={{ position: "absolute", top: 0, right: 0 }}>
        <LogoIcon src={Logo} alt="Logo" />
      </IconButton>
      <StyledTypography variant="h4" gutterBottom>
        Artificial Intelligence
      </StyledTypography>
      <PointsBox>
        <Typography variant="subtitle1">Points: 0</Typography>
      </PointsBox>
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        {challenges.map((challenge, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ChallengeCardMolecule challenge={challenge} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ChallengesListOrganism;
