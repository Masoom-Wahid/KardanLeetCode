import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";

const IconButtonAtom = ({ isFavorite, toggleFavorite }) => {
  return (
    <IconButton onClick={toggleFavorite}>
      <FontAwesomeIcon
        icon={isFavorite ? "fas fa-star" : "far fa-star"}
        color={isFavorite ? "blue" : "black"}
      />
    </IconButton>
  );
};

export default IconButtonAtom;
