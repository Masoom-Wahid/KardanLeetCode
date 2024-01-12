// Leaderboard.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { css, keyframes } from "@emotion/react";
import UserRows from "./UserRows"; // Adjust the import path as necessary

// Keyframes for animations
const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const LeaderboardStyle = css`
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  background: #f9f9f9; // Replace with your desired background color
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.5s ease-out forwards;
`;

const HeaderStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 2px solid #e0e0e0; // Replace with your desired color
`;

// Define the styles for the header titles here
const headerTitleStyle = css`
  font-size: 1rem;
  font-weight: 600;
  color: #333; // Replace with your desired color
  text-transform: uppercase;
`;

const Leaderboard = () => {
  return (
    <Box css={LeaderboardStyle}>
      <Box css={HeaderStyle}>
        <Typography css={headerTitleStyle}>User</Typography>
        <Typography css={headerTitleStyle}>Problem 1</Typography>
        <Typography css={headerTitleStyle}>Problem 2</Typography>
        <Typography css={headerTitleStyle}>Problem 3</Typography>
        <Typography css={headerTitleStyle}>Total Score</Typography>
        <Typography css={headerTitleStyle}>Pen. Time</Typography>
      </Box>
      <UserRows />
    </Box>
  );
};

export default Leaderboard;
