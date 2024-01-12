// ProblemCell.jsx
import React from "react";
import Icon from "../Atoms/Icon";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/material";
import { css } from "@emotion/react";

const problemCellStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  // Add additional styling such as padding or margins if needed
`;

const ProblemCell = ({ solved }) => {
  const icon = solved ? faCheck : faTimes;
  const color = solved ? "green" : "red"; // Use color codes to match your design

  return (
    <Box css={problemCellStyle}>
      <Icon icon={icon} color={color} />
    </Box>
  );
};

export default ProblemCell;
