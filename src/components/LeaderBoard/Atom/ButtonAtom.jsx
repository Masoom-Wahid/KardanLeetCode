import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)({
  backgroundColor: "#1565c0",
  color: "white",
  "&:hover": {
    backgroundColor: "#0d47a1",
  },
});

const ButtonAtom = ({ children, onClick, ...props }) => {
  return (
    <StyledButton onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};

export default ButtonAtom;
