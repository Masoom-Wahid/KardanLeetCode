// Header.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeaderStyle = css`
  display: flex;
  align-items: left;
  justify-content: space-between;
  padding: 24px;
  background: #ffffff; // A clean white background
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05); // Subtle shadow for depth
  border-radius: 12px; // Softened corners
  animation: ${fadeIn} 0.7s ease-out;
`;

const DynamicTitle = styled(Typography)`
  align-items: left;
  font-size: 2.8rem;
  font-weight: 700;
  color: #424242; // Dark grey for sophistication and readability
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #5c6bc0; // A subtle color change on hover for interactivity
  }
`;

// Replace the roundInfo, remainingTime, maxTime with your actual data or props
const Header = ({ roundInfo = "The Title", remainingTime, maxTime }) => {
  return (
    <Box css={HeaderStyle}>
      <DynamicTitle variant="h5">{roundInfo}</DynamicTitle>
      {/* ProgressBar and remainingTime will be added when those components are ready */}
    </Box>
  );
};

export default Header;
