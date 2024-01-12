// ProblemHeader.jsx
import React, { useState } from "react";
import styled from "@emotion/styled";
import { Typography, Box, LinearProgress, Button } from "@mui/material";

const ProblemHeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border-radius: 8px;
`;

const ProblemContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
  flex: 1;
`;

const TimeRemainingAndButtonContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

const TimeRemainingBox = styled(Box)`
  padding: 8px 16px;
  background-color: #f3f3f3;
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 16px;
`;

const StyledLinearProgress = styled(LinearProgress)`
  border-radius: 5px;
  width: 100%; // Ensures the progress bar fills the width of its container
  margin-top: 8px;
  background-color: #e0e0e0;
  .MuiLinearProgress-barColorPrimary {
    background: linear-gradient(
      to right,
      #4caf50 33%,
      #ffeb3b 33% 66%,
      #f44336 66%
    );
  }
`;

const MoreProblemsButton = styled(Button)`
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #388e3c;
  }
`;

const ProblemHeader = ({ problems, timeRemaining }) => {
  const [showAllProblems, setShowAllProblems] = useState(false);

  return (
    <ProblemHeaderContainer>
      {problems
        .slice(0, showAllProblems ? problems.length : 3)
        .map((problem, index) => (
          <ProblemContainer key={index}>
            <Typography variant="subtitle2">{problem.name}</Typography>
            <StyledLinearProgress
              variant="determinate"
              value={problem.progress}
            />
          </ProblemContainer>
        ))}
      <TimeRemainingAndButtonContainer>
        <TimeRemainingBox>
          <Typography variant="subtitle2">Time remaining</Typography>
          <Typography variant="h6" color="secondary">
            {timeRemaining}
          </Typography>
        </TimeRemainingBox>
        <MoreProblemsButton
          onClick={() => setShowAllProblems(!showAllProblems)}
        >
          {showAllProblems ? "Less" : "More"} problems
        </MoreProblemsButton>
      </TimeRemainingAndButtonContainer>
    </ProblemHeaderContainer>
  );
};

export default ProblemHeader;
