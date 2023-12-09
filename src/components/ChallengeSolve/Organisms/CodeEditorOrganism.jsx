import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Box, Typography, Button, Tabs, Tab, Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faUpload } from "@fortawesome/free-solid-svg-icons";

const CodingEnvironment = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "#1e1e1e",
          p: 1,
        }}
      >
        <Button
          variant="contained"
          startIcon={<FontAwesomeIcon icon={faPlay} />}
          sx={{ bgcolor: "red", height: "36px", mr: 1 }}
        >
          Run
        </Button>
        <Button
          variant="contained"
          startIcon={<FontAwesomeIcon icon={faUpload} />}
          sx={{ bgcolor: "red", height: "36px" }}
        >
          Submit
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Box sx={{ flexBasis: "50%", bgcolor: "primary.dark", p: 3 }}>
          <Typography variant="h5" color="primary.light">
            Two Sum
          </Typography>
          <Typography variant="caption" display="block" color="primary.light">
            Easy
          </Typography>
          <Paper sx={{ bgcolor: "primary.main", my: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="Description" />
              <Tab label="Submissions" />
            </Tabs>
          </Paper>
          <Typography variant="body2" color="primary.light"></Typography>
        </Box>
        <Box sx={{ flexBasis: "50%", bgcolor: "#2e2e2e", p: 3 }}>
          <Editor
            height="100%"
            defaultLanguage={language}
            defaultValue="// Write your code here"
            theme="vs-dark"
            onChange={setCode}
          />
          <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
            <Typography variant="body2" color="primary.light">
              Test Cases
            </Typography>
            <Typography variant="body2" color="primary.light">
              Test Results
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CodingEnvironment;
