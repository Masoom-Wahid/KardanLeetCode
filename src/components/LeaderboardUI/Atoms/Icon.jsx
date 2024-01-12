// Icon.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/material/styles";

const StyledIcon = styled(FontAwesomeIcon)({
  // Add your styles here
});

const Icon = ({ icon, ...props }) => {
  return <StyledIcon icon={icon} {...props} />;
};

export default Icon;
