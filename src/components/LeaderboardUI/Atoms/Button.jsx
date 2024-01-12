// Button.jsx
import React from "react";
import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(MuiButton)({
  // Add your styles here
});

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
