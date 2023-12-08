import { Typography } from "@mui/material";

const TypographyAtom = ({ variant, children, ...props }) => {
  return (
    <Typography variant={variant} {...props}>
      {children}
    </Typography>
  );
};

export default TypographyAtom;
