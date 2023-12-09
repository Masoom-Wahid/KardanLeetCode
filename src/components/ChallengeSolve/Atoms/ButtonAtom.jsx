import React from "react";
import { Button } from "@mui/material";

const ButtonAtom = ({ children, onClick }) => (
  <Button onClick={onClick}>{children}</Button>
);

export default ButtonAtom;
