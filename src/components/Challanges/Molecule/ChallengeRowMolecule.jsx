import React from "react";
import { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CheckboxAtom from "../Atom/CheckboxAtom";
import IconAtom from "../Atom/IconAtom";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

const ScoreBox = styled("div")(({ theme }) => ({
  padding: theme.spacing(0.5),
  border: `1px solid ${theme.palette.divider}`,
  textAlign: "center",
  width: "35px", // Smaller width for max score box
  display: "inline-block",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)", // subtle shadow for depth
  backgroundColor: theme.palette.background.paper, // match theme background
  transition: "transform 0.3s ease", // smooth transform transition
  "&:hover": {
    transform: "scale(1.1)", // slightly larger on hover for a 3D effect
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&:first-of-type": {
    paddingLeft: theme.spacing(2), // increased padding for the first cell
  },
  "&:last-of-type": {
    paddingRight: theme.spacing(2), // increased padding for the last cell
  },
}));

const DeleteButton = styled(IconAtom)(({ theme }) => ({
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "rotate(-15deg)", // rotate the delete button on hover
    color: theme.palette.error.main, // change color on hover
  },
}));

const ChallengeRowMolecule = ({ challenge, index }) => {
  const [binary, setBinary] = useState(challenge.binary);
  const [editorial, setEditorial] = useState(challenge.editorial);

  const handleBinaryChange = () => {
    setBinary(!binary);
    // You can also propagate this change up to the parent component if needed
  };

  const handleEditorialChange = () => {
    setEditorial(!editorial);
    // Handle change similarly
  };

  return (
    <TableRow>
      <StyledTableCell>{index + 1}</StyledTableCell>
      <StyledTableCell>{challenge.name}</StyledTableCell>
      <StyledTableCell>
        <ScoreBox>{challenge.maxScore}</ScoreBox>
      </StyledTableCell>
      <TableCell>
        <CheckboxAtom checked={binary} onChange={handleBinaryChange} />
      </TableCell>
      <TableCell>
        <CheckboxAtom checked={editorial} onChange={handleEditorialChange} />
      </TableCell>
      <StyledTableCell>
        <DeleteButton icon={<DeleteIcon />} />
      </StyledTableCell>
    </TableRow>
  );
};

export default ChallengeRowMolecule;
