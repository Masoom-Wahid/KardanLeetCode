// LeaderboardPage.jsx
import React from "react";
import { css, keyframes } from "@emotion/react";
import PageLayout from "../Templates/PageLayout";

// Keyframes for page-specific animations
const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const LeaderboardPageStyle = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${backgroundAnimation} 15s ease infinite;
  color: #fff; // Adjust the text color based on your preference

  // Custom styling for inner content
  .content {
    padding: 20px;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

// Sample data - Replace with real data later
const sampleData = {
  roundInfo: "Round C 2020",
  remainingTime: 60,
  maxTime: 120,
  users: [
    // ... User data here
  ],
};

const LeaderboardPage = () => {
  return (
    <div css={LeaderboardPageStyle}>
      <div className="content">
        <PageLayout />
      </div>
    </div>
  );
};

export default LeaderboardPage;
