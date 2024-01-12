// UserRow.jsx
import React from "react";
import { Box } from "@mui/material";
import { css, keyframes } from "@emotion/react";
import UserCell from "../Molecules/UserCell";
import ProblemCell from "../Molecules/ProblemCell";
import ScoreCell from "../Molecules/ScoreCell";
import TimeCell from "../Molecules/TimeCell";

// Keyframes for animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const UserRowStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between; // This will space out the child elements
  padding: 10px;
  margin: 5px 0;
  background: linear-gradient(145deg, #f5f5f5, #ffffff); // subtle 3D effect
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out forwards;
  // Hover effect
  &:hover {
    animation: ${float} 2s infinite;
  }
`;

// Static data array
const userData = [
  {
    id: 1,
    username: "tmwilliamlin168",
    avatarSrc: "/avatars/tmwilliamlin168.png",
    problems: [true, true, false, true],
    score: 100,
    time: "0:26:53",
  },
  {
    id: 2,
    username: "geothermal",
    avatarSrc: "/avatars/geothermal.png",
    problems: [true, false, true, false],
    score: 71,
    time: "0:22:17",
  },
  {
    id: 2,
    username: "geothermal",
    avatarSrc: "/avatars/geothermal.png",
    problems: [true, false, true, false],
    score: 71,
    time: "0:22:17",
  },
  {
    id: 2,
    username: "geothermal",
    avatarSrc: "/avatars/geothermal.png",
    problems: [true, false, true, false],
    score: 71,
    time: "0:22:17",
  },
  // ... more users
];

const UserRow = ({ user }) => {
  return (
    <Box css={UserRowStyle}>
      <UserCell username={user.username} avatarSrc={user.avatarSrc} />
      {user.problems.map((solved, index) => (
        <ProblemCell key={index} solved={solved} />
      ))}
      <ScoreCell score={user.score} />
      <TimeCell time={user.time} />
    </Box>
  );
};

// Mapping through the userData to create UserRow components
const UserRows = () => {
  return (
    <div>
      {userData.map((user) => (
        <UserRow key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserRows;
