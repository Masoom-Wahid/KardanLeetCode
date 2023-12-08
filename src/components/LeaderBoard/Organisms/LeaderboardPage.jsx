import React, { useState } from "react";
import {
  Box,
  Typography,
  ButtonGroup,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import LeaderboardTableOrganism from "./LeaderboardTableOrganism";
import ButtonAtom from "../Atom/ButtonAtom"; // Ensure ButtonAtom can accept 'selected' prop or style conditionally
import "./LeaderboardPage.scss"; // Ensure you have this SCSS file for styles

const LeaderboardPage = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handler for filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Handler for search change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const leaderboardData = [];
  const filterOptions = [
    { value: "school", label: "School" },
    { value: "company", label: "Company" },
    { value: "country", label: "Country" },
  ];

  return (
    <Box className="leaderboard-page">
      <LeaderboardTableOrganism leaderboardData={leaderboardData} />
      {/* Pagination and additional content goes here */}
    </Box>
  );
};

export default LeaderboardPage;
