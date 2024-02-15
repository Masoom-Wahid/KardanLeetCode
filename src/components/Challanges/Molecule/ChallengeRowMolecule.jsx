import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconAtom from "../Atom/IconAtom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import styles from "./ChallengeRowMolecule.module.css";

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

const ChallengeRowMolecule = ({ challenge, index, onDelete }) => {
  const navigate = useNavigate();
  return (
    <TableRow>
      <StyledTableCell>{index + 1}</StyledTableCell>
      <StyledTableCell
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/challenges/${challenge.id}`)}
      >
        {challenge.title}
      </StyledTableCell>
      <StyledTableCell>{challenge.lvl}</StyledTableCell>
      <StyledTableCell>
        <ScoreBox>{challenge.point}</ScoreBox>
      </StyledTableCell>
      <StyledTableCell>
        <ScoreBox>{challenge.time_limit}</ScoreBox>
      </StyledTableCell>
      <StyledTableCell>
        <FontAwesomeIcon
          icon={faEdit}
          className={(styles.actionIcon, styles.editIcon)}
          onClick={() => navigate(`/challenges/${challenge.id}`)}
        />
        <FontAwesomeIcon
          icon={faTrashAlt}
          onClick={() => onDelete(challenge.id)}
          className={(styles.actionIcon, styles.deleteIcon)}
        />
      </StyledTableCell>
    </TableRow>
  );
};

export default ChallengeRowMolecule;
