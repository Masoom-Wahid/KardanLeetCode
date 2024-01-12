// Avatar.jsx
import React from "react";
import { Avatar as MuiAvatar } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAvatar = styled(MuiAvatar)({
  // Add your styles here
});

const Avatar = ({ src, alt, ...props }) => {
  return <StyledAvatar src={src} alt={alt} {...props} />;
};

export default Avatar;
