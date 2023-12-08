import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectAtom = ({ label, value, onChange, options }) => {
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={onChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectAtom;
