import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NavigationBar from "../NavBar/Navbar";

const challenges = [
  {
    id: 1,
    name: "Tower Breakers",
    maxScore: 15,
    binary: false,
    editorial: false,
  },
  {
    id: 2,
    name: "Mini-Max Sum",
    maxScore: 10,
    binary: false,
    editorial: false,
  },
  { id: 3, name: "Prime Dates", maxScore: 15, binary: false, editorial: false },
  {
    id: 4,
    name: "Counter game",
    maxScore: 10,
    binary: false,
    editorial: false,
  },
];

function ContestChallenges() {
  return (
    <>
      <h1>Kardan University's Programming Contest</h1>
      <p>
        Add challenges to your contest by selecting challenges from our library
        or create and add your own challenges here. To reorder your challenges,
        simply select the challenge and then drag and drop to the desired
        location.
      </p>
      <Button variant="contained" color="primary">
        Add Challenge
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="contest challenges table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Max Score</TableCell>
              <TableCell>Binary</TableCell>
              <TableCell>Editorial</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {challenges.map((challenge, index) => (
              <TableRow key={challenge.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{challenge.name}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    defaultValue={challenge.maxScore}
                    inputProps={{ "aria-label": "Max Score" }}
                  />
                </TableCell>
                <TableCell padding="checkbox">
                  <Checkbox checked={challenge.binary} color="primary" />
                </TableCell>
                <TableCell padding="checkbox">
                  <Checkbox checked={challenge.editorial} color="primary" />
                </TableCell>
                <TableCell>
                  <IconButton aria-label="delete challenge">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ContestChallenges;
