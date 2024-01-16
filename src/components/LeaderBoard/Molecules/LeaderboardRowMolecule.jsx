import React from "react";
import { TableRow, TableCell, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const LeaderboardRowMolecule = ({  name,rank, point, time, penalty }) => {
  console.log(rank,name,point,time,penalty)
  return (
    <StyledTableRow>
      <TableCell component="th" scope="row">
        {rank}
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{point}</TableCell>
      <TableCell>{time}</TableCell>
      <TableCell>{penalty}</TableCell>
    </StyledTableRow>
  );
};

export default LeaderboardRowMolecule;
