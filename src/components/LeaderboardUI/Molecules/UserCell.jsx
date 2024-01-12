// UserCell.jsx
import React from "react";
import Avatar from "../Atoms/Avatar";
import Text from "../Atoms/Text";
import { Box } from "@mui/material";
import { css } from "@emotion/react";

const userCellStyle = css`
  display: flex;
  align-items: center;
  gap: 10px; // Adjust the spacing between the avatar and the text as needed
`;

const usernameStyle = css`
  font-weight: bold;
  color: #333; // Replace with the actual color from your design
  // Add any additional styles like font-size, etc.
`;

const UserCell = ({ username, avatarSrc }) => {
  return (
    <Box css={userCellStyle}>
      <Avatar src={avatarSrc} alt={username} sx={{ width: 32, height: 32 }} />
      <Text css={usernameStyle}>{username}</Text>
    </Box>
  );
};

export default UserCell;
