// ContestChallenges.jsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import ChallengeTableOrganism from "./ChallengeTableOrganism";
import "./ContestChallenges.scss";
import logo from "../../assets/logo.png";
import NavigationBar from "../../NavBar/Navbar";

const challengesData = [
  {
    id: 1,
    name: "Tower Breakers",
    maxScore: 15,
    binary: false,
    editorial: false,
  },
];

const ContestChallenges = () => {
  return (
    <>
      <NavigationBar />
      <Box className="contest-challenges">
        {/* <img
          src={logo}
          alt="Kardan University Logo"
          className="logo-placeholder"
        /> */}
        {/* Logo placeholder */}
        <Typography variant="h2" className="title">
          Kardan University's Programming Contest
        </Typography>
        <Typography variant="subtitle1" className="description">
          Add challenges to your contest by selecting challenges from our
          library or create and add your own challenges here. To reorder your
          challenges, simply select the challenge and then drag and drop to the
          desired location.
        </Typography>
        <Paper className="challenge-table-container">
          <ChallengeTableOrganism challenges={challengesData} />
        </Paper>
      </Box>
    </>
  );
};

export default ContestChallenges;
