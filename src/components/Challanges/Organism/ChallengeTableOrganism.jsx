import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import ChallengeHeaderMolecule from "../Molecule/ChallengeHeaderMolecule";
import ChallengeRowMolecule from "../Molecule/ChallengeRowMolecule";

const staticChallenges = [
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
    name: "Counter Game",
    maxScore: 10,
    binary: false,
    editorial: false,
  },
];

const ChallengeTableOrganism = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="contest challenges table">
        <ChallengeHeaderMolecule />
        <TableBody>
          {staticChallenges.map((challenge, index) => (
            <ChallengeRowMolecule
              key={challenge.id}
              challenge={challenge}
              index={index}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChallengeTableOrganism;
