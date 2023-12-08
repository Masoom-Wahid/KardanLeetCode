import React from "react";
import { Box, Grid } from "@mui/material";
import ChallengeCardMolecule from "../Molecules/ChallengeCardMolecule";
import Typography from "../Atoms/TypographyAtom";

const ChallengesListOrganism = ({ challenges }) => {
  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        Artificial Intelligence
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Points: 0 | Rank: 126268
      </Typography>
      <Grid container spacing={2}>
        {challenges.map((challenge, index) => (
          <Grid item xs={12} key={index}>
            <ChallengeCardMolecule challenge={challenge} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ChallengesListOrganism;
