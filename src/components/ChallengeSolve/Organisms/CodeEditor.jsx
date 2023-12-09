import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Box, IconButton, Select, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

const CodeEditor = () => {
  const [language, setLanguage] = useState("python3");

  return (
    <Box
      sx={{
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        m: 0,
        overflow: "hidden",
        height: "63vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          bgcolor: "primary.light",
          height: "50px",
        }}
      >
        <Select
          className="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          color="primary"
          sx={{
            height: "30px",
            bgcolor: "primary.dark",
          }}
        >
          <MenuItem value="python3">Python 3</MenuItem>
          {/* Add other languages */}
        </Select>
        <IconButton className="reset-icon" color="primary">
          <FontAwesomeIcon icon={faUndo} />
        </IconButton>
      </Box>
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        defaultValue="// Your code goes here"
      />
    </Box>
  );
};

export default CodeEditor;
