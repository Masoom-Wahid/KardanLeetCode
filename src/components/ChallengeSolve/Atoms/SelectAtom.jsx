import React from "react";
import { Select, MenuItem } from "@mui/material";

const SelectAtom = ({ value, onChange, options }) => (
  <Select value={value} onChange={onChange}>
    {options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </Select>
);

export default SelectAtom;
