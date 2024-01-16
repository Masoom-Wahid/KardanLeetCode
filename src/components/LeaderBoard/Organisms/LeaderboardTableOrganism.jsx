import React, { useState,useEffect } from "react";
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


const WEBSOCKET_URL = "ws://127.0.0.1:8000/";

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
    penalty: "100",
  }
];

const LeaderboardTableOrganism = () => {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [leaderBoardData, setLeaderboardData] = useState([]);
  const [chatSocket, setChatSocket] = useState();

  const StyledFormControl = styled(FormControl)({
    minWidth: 120,
    maxWidth: 300,
  });

  const StyledButton = styled(Button)({
    height: "36px",
  });

  const filterOptions = [
    { value: "school", label: "School" },
    { value: "company", label: "Company" },
    { value: "country", label: "Country" },
  ];


  
  useEffect(() => {
    let accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA1NDcxNDU1LCJpYXQiOjE3MDUyMTIyNTUsImp0aSI6ImI3MGFmNGQzMGY2ZDRkM2ViZjY4ZjM4NjE2ODE0ZmU0IiwidXNlcl9pZCI6MX0.fvPYIwYXV2oQDWpe2q5-h-Mt9JeR5TzeTpxQHR53hzQ";
  
    let url = `${WEBSOCKET_URL}leaderboard/?token=${accessToken}`;
    const chat = new WebSocket(url);
    setChatSocket(chat);
  
    chat.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data.message)
      setLeaderboardData(Object.entries(data.message));
      console.log(Object.values(data.message));
    };
  }, []);


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
          <Box sx={{ display: "flex", gap: "10px", marginRight: "-30px" }}>
            <StyledButton
              variant={filter === "all" ? "contained" : "outlined"}
              color="primary"
            >
              All
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
          </Box>
        </Box>
        <StyledTable>
          <TableHead sx={{ backgroundColor: "#1565c0" }} className="header">
            <TableRow>
              <TableCell className="table-header-cell">Rank</TableCell>
              <TableCell className="table-header-cell">User</TableCell>
              <TableCell className="table-header-cell">Score</TableCell>
              <TableCell className="table-header-cell">Time</TableCell>
              <TableCell className="table-header-cell">Penalty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderBoardData.map(([contestantName, contestant],index) => (
              <LeaderboardRowMolecule key={contestantName} name={contestantName} rank={index+1} {...contestant} />
            ))}
          </TableBody>
        </StyledTable>
      </Box>
    </>
  );
};

export default LeaderboardTableOrganism;