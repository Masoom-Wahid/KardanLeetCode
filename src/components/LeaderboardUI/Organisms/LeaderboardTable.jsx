import React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import { keyframes } from "@mui/material";
import ProblemsHeader from "./ProblemsHeader";

// Add your gradient animation here
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled components using Material UI and Emotion
const StyledPaper = styled(Paper)({
  width: "100%",
  overflowX: "auto",
  margin: "20px auto",
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
  animation: `${gradientAnimation} 30s ease infinite`,
});

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const StyledTableCell = styled(TableCell)({
  color: "white",
  fontWeight: "bold",
  letterSpacing: "0.1em",
  textAlign: "center",
});

const StyledTableRow = styled(TableRow)({
  "&:nth-of-type(odd)": {
    backgroundColor: "#000",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#000",
  },
  "&:hover": {
    backgroundColor: "#000",
  },
});

const StyledTypographyCell = styled(Typography)({
  padding: "6px 12px",
  borderRadius: "6px",
  margin: "0 5px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    background: "rgba(0, 123, 255, 0.7)",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
    transform: "translateY(-2px)",
  },
});

// Example static data
const competitorData = [
  {
    id: 1,
    rank: 1,
    username: "tmwilliamlin168",
    problemStatus: [true, true, false],
    problemScores: [5, 8, 0], // Scores for each problem
    score: 100,
    penTime: "0:26:53",
  },
  {
    id: 1,
    rank: 1,
    username: "tmwilliamlin168",
    problemStatus: [true, true, false],
    problemScores: [5, 8, 0], // Scores for each problem
    score: 100,
    penTime: "0:26:53",
  },
  {
    id: 1,
    rank: 1,
    username: "tmwilliamlin168",
    problemStatus: [true, true, false],
    problemScores: [5, 8, 0], // Scores for each problem
    score: 100,
    penTime: "0:26:53",
  },
  {
    id: 1,
    rank: 1,
    username: "tmwilliamlin168",
    problemStatus: [true, true, false],
    problemScores: [5, 8, 0], // Scores for each problem
    score: 100,
    penTime: "0:26:53",
  },

  // ... (other competitor data)
];

const LeaderboardTable = () => {
  const [showAllProblems, setShowAllProblems] = useState(false);

  const handleMoreClick = () => {
    setShowAllProblems(!showAllProblems);
  };

  // Example static data for problems
  const problemsData = [
    { name: "Problem1", progress: 80 },
    { name: "Problem2", progress: 60 },
    { name: "Problem3", progress: 40 },
  ];
  const timeRemaining = "20:30:59";

  return (
    <>
      <ProblemsHeader problems={problemsData} timeRemaining={timeRemaining} />
      <StyledPaper>
        <Table>
          {/* Normally you would have TableHead here but we're omitting it as per the design */}
          <TableBody>
            {competitorData.map((competitor, rowIndex) => (
              <StyledTableRow key={competitor.id}>
                <StyledTableCell>{competitor.rank}</StyledTableCell>
                <StyledTableCell>
                  <StyledTypographyCell>
                    {competitor.username}
                  </StyledTypographyCell>
                </StyledTableCell>
                {problemsData.map((problem, problemIndex) => (
                  <StyledTableCell key={problemIndex}>
                    {rowIndex === 0 && (
                      <Box textAlign="center">
                        <Typography variant="subtitle2">
                          {problem.name}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={problem.progress}
                        />
                      </Box>
                    )}
                    <StyledTypographyCell>
                      {competitor.problemStatus[problemIndex]
                        ? `✓ ${competitor.problemScores[problemIndex]}`
                        : `✗`}
                    </StyledTypographyCell>
                  </StyledTableCell>
                ))}
                <StyledTableCell>{competitor.score}</StyledTableCell>
                <StyledTableCell>{competitor.penTime}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledPaper>
    </>
  );
};

export default LeaderboardTable;
