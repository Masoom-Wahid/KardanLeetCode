import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TestCases = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box
      sx={{
        borderRadius: "12px",
        border: "1px solid #ccc",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        m: 0,
        overflow: "hidden",
        height: "63vh",
      }}
    >
      <Tabs value={tabValue} onChange={(e, val) => setTabValue(val)} centered>
        <Tab label="Test Cases" />
        <Tab label="Test Results" />
      </Tabs>
      {tabValue === 0 && (
        <Box sx={{ p: 2 }}>
          <Typography variant="body1" color="primary">
            Case 1
          </Typography>
          <IconButton color="primary">
            <FontAwesomeIcon icon={faPlus} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default TestCases;
