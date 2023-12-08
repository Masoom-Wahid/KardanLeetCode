import IconButton from "@mui/material/IconButton";

const IconAtom = ({ icon, ...props }) => {
  return <IconButton {...props}>{icon}</IconButton>;
};

export default IconAtom;
