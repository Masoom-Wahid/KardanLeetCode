import Button from "@mui/material/Button";

const ButtonAtom = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export default ButtonAtom;
