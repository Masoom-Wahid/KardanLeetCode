import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import ChallengeCardMolecule from "../Molecules/ChallengeCardMolecule";
import { styled } from "@mui/material/styles";
import "./Challenges.scss";
import NavigationBar from "../../NavBar/Navbar";

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: theme.palette.primary.main,
  textShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
}));

const ChallengesContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const ChallengesPage = () => {
  const challengesData = [
    {
      id: 1,
      name: "Bot saves princess",
      maxScore: 13,
      successRate: "73.47%",
      description:
        "An introduction to bot challenges. Rescue the princess trapped in the corner of the grid.",
    },
    {
      id: 2,
      name: "Bot saves princess - 2",
      maxScore: 13,
      successRate: "73.47%",
      description:
        "An introduction to bot challenges. Rescue the princess trapped in the corner of the grid.",
    },
    {
      id: 3,
      name: "Bot saves princess - 3",
      maxScore: 13,
      successRate: "73.47%",
      description:
        "An introduction to bot challenges. Rescue the princess trapped in the corner of the grid.",
    },
  ];

  return (
    <>
      <NavigationBar />
      <ChallengesContainer>
        <Box className="challenges-page">
          <Box className="header-section">
            <Typography variant="h4" className="page-title">
              Artificial Intelligence
            </Typography>
            <Typography variant="subtitle1" className="page-info">
              Points: 0 | Rank: 126268
            </Typography>
          </Box>
        </Box>
        <div>
          {challengesData.map((challenge) => (
            <ChallengeCardMolecule key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </ChallengesContainer>
    </>
  );
};

export default ChallengesPage;
