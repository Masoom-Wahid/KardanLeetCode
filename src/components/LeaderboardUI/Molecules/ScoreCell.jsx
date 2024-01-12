// ScoreCell.jsx
import React from "react";
import Text from "../Atoms/Text";
import { css } from "@emotion/react";

const scoreStyle = css`
  font-weight: bold;
  color: #333; // Replace with the actual color from your design
  // Add any additional styles like font-size, etc.
`;

const ScoreCell = ({ score }) => {
  return <Text css={scoreStyle}>{score}</Text>;
};

export default ScoreCell;
