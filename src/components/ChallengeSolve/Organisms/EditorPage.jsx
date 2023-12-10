import React, { useState } from "react";
import { Box, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import MainHeader from "./MainHeader";
import DescriptionBox from "./DescriptionBox";
import CodeEditor from "./CodeEditor";
import TestCases from "./TestCases";

const EditorPage = () => {
  const [mode, setMode] = useState("light");

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <>
      <div className="editor-page">
        <CssBaseline />
        <Box
          sx={{
            height: "100vh",
            paddingBottom: "5px",
            marginBottom: "5px",

            flexDirection: "column",
            m: 0,
          }}
        >
          <MainHeader />
          <Box sx={{ display: "flex", flexGrow: 1, p: 0 }}>
            <DescriptionBox sx={{ flexBasis: "auto", flexGrow: 0 }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                p: 0,
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <CodeEditor />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <TestCases />
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default EditorPage;
