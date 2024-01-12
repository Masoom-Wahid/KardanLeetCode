// Example for a generic text component
// /atoms/Text/Text.jsx
import React from "react";
import { Typography } from "@mui/material";

const Text = ({ children, ...props }) => {
  return <Typography {...props}>{children}</Typography>;
};

export default Text;
