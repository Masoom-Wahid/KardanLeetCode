// TimeCell.jsx
import React from "react";
import Text from "../Atoms/Text";
import { css } from "@emotion/react";

const timeStyle = css`
  color: #666; // Replace with the actual color from your design
  // Add any additional styles like font-size, etc.
`;

const TimeCell = ({ time }) => {
  return <Text css={timeStyle}>{time}</Text>;
};

export default TimeCell;
