import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  TextField,
  styled,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const MainTabs = styled(Tabs)({
  backgroundColor: "#f5f5f5",
  ".Mui-selected": {
    color: "#1976d2",
    background: "rgba(25, 118, 210, 0.1)",
  },
});

const CaseTabs = styled(Tabs)({
  ".MuiTab-root": {
    minWidth: "auto",
    padding: "6px 12px",
  },
  ".Mui-selected": {
    backgroundColor: "#e0e0e0",
    color: "#333",
  },
});

const TestCaseBox = styled(Box)({
  padding: "8px",
  marginBottom: "8px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "white",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

const TestCases = () => {
  const [mainTabValue, setMainTabValue] = useState(0);
  const [selectedCase, setSelectedCase] = useState(0);

  const testCases = [
    { id: 1, input: "123", output: "456" },
    { id: 2, input: "789", output: "1011" },
    { id: 3, input: "234", output: "567" },
    { id: 4, input: "345", output: "678" },
  ];

  return (
    <Box
      sx={{
        marginLeft: "5px",
        marginTop: "3px",
        borderRadius: "12px",
        border: "1px solid #ccc",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        height: "63vh",
      }}
    >
      <MainTabs
        value={mainTabValue}
        onChange={(e, val) => setMainTabValue(val)}
      >
        <Tab label="Test Cases" />
        <Tab label="Test Results" />
      </MainTabs>
      {mainTabValue === 0 && (
        <Box>
          <CaseTabs
            value={selectedCase}
            onChange={(e, val) => setSelectedCase(val)}
          >
            {testCases.map((testCase, index) => (
              <Tab key={index} label={`Case ${testCase.id}`} />
            ))}
            <IconButton color="primary" size="small">
              <FontAwesomeIcon icon={faPlus} />
            </IconButton>
          </CaseTabs>

          {testCases.map((testCase, index) => (
            <TestCaseBox
              key={index}
              sx={{ display: selectedCase === index ? "block" : "none" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="caption">Input:</Typography>
                <TextField size="small" value={testCase.input} disabled />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  marginTop: 1,
                }}
              >
                <Typography variant="caption">Output:</Typography>
                <TextField size="small" value={testCase.output} disabled />
              </Box>
            </TestCaseBox>
          ))}
        </Box>
      )}
      {/* Test Results tab content goes here */}
    </Box>
  );
};

export default TestCases;
