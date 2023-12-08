import React from "react";
import { TableRow, TableCell, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const LeaderboardRowMolecule = ({ rank, user, score, time, country }) => {
  return (
    <StyledTableRow>
      <TableCell component="th" scope="row">
        {rank}
      </TableCell>
      <TableCell>{user}</TableCell>
      <TableCell>{score}</TableCell>
      <TableCell>{time}</TableCell>
      <TableCell>
        <Avatar src={country} />
      </TableCell>
    </StyledTableRow>
  );
};

export default LeaderboardRowMolecule;
