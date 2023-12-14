import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Box, IconButton, Select, MenuItem, styled } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@mui/material/styles";

const StyledSelect = styled(Select)(({ theme }) => ({
  height: "30px",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.primary.contrastText,
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const CodeEditor = () => {
  const [language, setLanguage] = useState("python");
  const [editorContent, setEditorContent] = useState("");

  // Boilerplate code for each language
  const languageBoilerplates = {
    python: "# Python 3 startup code\n\nprint('Hello, World!')\n",
    java: "public class Main {\n    public static void main(String[] args) {\n        System.out.println('Hello, World!');\n    }\n}",
    c: "#include <stdio.h>\n\nint main() {\n   printf('Hello, World!');\n   return 0;\n}",
    cpp: "#include <iostream>\n\nint main() {\n    std::cout << 'Hello, World!';\n    return 0;\n}",
    csharp:
      "using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine('Hello, World!');\n    }\n}",
    javascript: "console.log('Hello, World!');\n",
    typescript: "console.log('Hello, World!');\n",
    php: "something",
  };

  useEffect(() => {
    setEditorContent(languageBoilerplates[language]);
  }, [language]);
  const theme = useTheme();

  const handleReset = () => {
    setEditorContent(languageBoilerplates[language]);
  };

  return (
    <Box
      sx={{
        marginTop: "5px",
        marginLeft: "5px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "63vh",
        bgcolor: "background.paper",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          height: "4vh",
          bgcolor: theme.palette.background.paper,
          boxShadow:
            theme.palette.mode === "light"
              ? "0px 4px rgba(0, 0, 0, 0.15)"
              : "0px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        <StyledSelect
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="java">Java</MenuItem>
          <MenuItem value="c">C</MenuItem>
          <MenuItem value="cpp">C++</MenuItem>
          <MenuItem value="csharp">C#</MenuItem>
          <MenuItem value="javascript">JavaScript</MenuItem>
          <MenuItem value="typescript">TypeScript</MenuItem>
          <MenuItem value="php">PHP</MenuItem>
        </StyledSelect>
        <StyledIconButton onClick={handleReset} color="primary">
          <FontAwesomeIcon icon={faUndo} />
        </StyledIconButton>
      </Box>
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        value={editorContent}
        onChange={setEditorContent}
      />
    </Box>
  );
};

export default CodeEditor;
