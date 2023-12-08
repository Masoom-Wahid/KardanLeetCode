import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import LeaderboardRowMolecule from "../Molecules/LeaderboardRowMolecule";
import { styled } from "@mui/material/styles";
import "./LeaderboardTableOrganism.scss";

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  borderCollapse: "collapse",
  "& thead th": {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  "& thead th, & tbody td": {
    border: "1px solid #e0e0e0",
  },
}));

const mockLeaderboardData = [
  {
    rank: 1,
    user: "Silab007",
    score: "81.11",
    time: "7:17:22",
    country: "CountryFlag.png",
  },
  {
    rank: 2,
    user: "Silab007",
    score: "81.11",
    time: "7:17:22",
    country: "CountryFlag.png",
  },
  {
    rank: 3,
    user: "Silab007",
    score: "81.11",
    time: "7:17:22",
    country: "CountryFlag.png",
  },
  {
    rank: 4,
    user: "Silab007",
    score: "81.11",
    time: "7:17:22",
    country: "CountryFlag.png",
  },
  {
    rank: 5,
    user: "Silab007",
    score: "81.11",
    time: "7:17:22",
    country: "CountryFlag.png",
  },
  {
    rank: 6,
    user: "Silab007",
    score: "81.11",
    time: "7:17:22",
    country: "CountryFlag.png",
  },
];

const LeaderboardTableOrganism = () => {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const StyledFormControl = styled(FormControl)({
    minWidth: 120,
    maxWidth: 300,
  });

  const StyledButton = styled(Button)({
    margin: "0 20px",
    height: "36px",
  });

  const filterOptions = [
    { value: "school", label: "School" },
    { value: "company", label: "Company" },
    { value: "country", label: "Country" },
  ];

  return (
    <>
      <Box className="leaderboard-table-container">
        <Typography variant="h4" className="leaderboard-title">
          Leaderboard
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px" }}>
            <StyledButton
              variant={filter === "all" ? "contained" : "outlined"}
              color="primary"
            >
              All
            </StyledButton>
            <StyledButton
              variant={filter === "friends" ? "contained" : "outlined"}
              color="secondary"
            >
              Friends
            </StyledButton>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <StyledFormControl variant="outlined" size="small">
              <InputLabel>Filter by</InputLabel>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                label="Filter by"
              >
                {filterOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
            <TextField
              size="small"
              placeholder="Type username to compare"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginLeft: "8px" }}
            />
            <StyledButton onClick={() => console.log("Compare", searchTerm)}>
              Compare
            </StyledButton>
          </Box>
        </Box>
        <StyledTable>
          <TableHead sx={{ backgroundColor: "#1565c0" }} className="header">
            <TableRow>
              <TableCell className="table-header-cell">Rank</TableCell>
              <TableCell className="table-header-cell">User</TableCell>
              <TableCell className="table-header-cell">Score</TableCell>
              <TableCell className="table-header-cell">Time</TableCell>
              <TableCell className="table-header-cell">Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockLeaderboardData.map((row, index) => (
              <LeaderboardRowMolecule key={index} {...row} />
            ))}
          </TableBody>
        </StyledTable>
      </Box>
    </>
  );
};

export default LeaderboardTableOrganism;
