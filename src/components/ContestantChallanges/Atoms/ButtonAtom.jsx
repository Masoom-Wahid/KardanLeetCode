import { Button } from "@mui/material";

const ButtonAtom = ({ children, onClick, ...props }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

export default ButtonAtom;
