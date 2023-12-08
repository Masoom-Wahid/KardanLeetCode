import { TextField } from "@mui/material";

const InputAtom = ({ placeholder, value, onChange }) => {
  return (
    <TextField placeholder={placeholder} value={value} onChange={onChange} />
  );
};

export default InputAtom;
