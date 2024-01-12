// PageLayout.jsx
import React from "react";
import { css, keyframes } from "@emotion/react";
import Header from "../Organisms/Header"; // Adjust the import path as necessary
import Leaderboard from "../Organisms/Leaderboard"; // Adjust the import path as necessary
import { Container } from "@mui/material";
import LeaderboardTable from "../Organisms/LeaderboardTable";

// Keyframes for background animation
const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const PageLayoutStyle = css`
  min-height: 100vh;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${backgroundAnimation} 15s ease infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
`;

const ContainerStyle = css`
  width: 80%;
  max-width: 100%;
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  // More custom styles here
`;

const PageLayout = () => {
  return (
    <div css={PageLayoutStyle}>
      <Container css={ContainerStyle}>
        <Header />
        <LeaderboardTable />
      </Container>
    </div>
  );
};

export default PageLayout;
