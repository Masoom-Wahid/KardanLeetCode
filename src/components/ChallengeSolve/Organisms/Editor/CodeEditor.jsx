import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
} from "react";
import Editor from "@monaco-editor/react";
import {
  Box,
  IconButton,
  Select,
  MenuItem,
  styled,
  Modal,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import "./CodeEditor.css";

const StyledSelect = styled(Select)(({ theme }) => ({
  height: "30px",
  backgroundColor: "#0E43AB",
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.primary.contrastText,
  },
}));

const ForbiddenModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "40%",
  minWidth: "300px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  outline: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: theme.palette.grey[500],
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const CodeEditor = ({
  editorContent,
  setEditorContent,
  readOnly,
  solvedCode,
  language,
  setLanguage,
}) => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const [isReadOnly, setIsReadOnly] = useState(readOnly);
  const [showForbiddenModal, setShowForbiddenModal] = useState(false);

  const handleModalClose = () => {
    setEditorContent(languageBoilerplates[language]);
    setShowForbiddenModal(false);
  };

  const forbiddenImports = {
    python: "import os",
    java: "import java.io.File;",
    c: "#include <stdlib.h>",
    cpp: "#include <cstdlib>",
    rust: "use std::fs;",
    javascript: "const fs = require('fs');",
    typescript: "import fs from 'fs';",
    csharp: "using System.IO;",
    php: "use Filesystem;",
  };

  const checkForForbiddenCode = useCallback(
    (content, language) => {
      const forbiddenPhrase = forbiddenImports[language];
      let isForbidden = false;

      if (forbiddenPhrase && content.includes(forbiddenPhrase)) {
        const lines = content.split("\n");
        const markers = lines
          .map((line, index) => {
            if (line.includes(forbiddenPhrase)) {
              console.log(
                `Forbidden phrase found: ${forbiddenPhrase} on line ${
                  index + 1
                }`
              );
              isForbidden = true;
              return {
                startLineNumber: index + 1,
                startColumn: line.indexOf(forbiddenPhrase) + 1,
                endLineNumber: index + 1,
                endColumn:
                  line.indexOf(forbiddenPhrase) + forbiddenPhrase.length + 1,
                message: `"${forbiddenPhrase}" is not allowed in ${language}`,
                severity: monacoRef.current.MarkerSeverity.Warning,
              };
            }
            return null;
          })
          .filter((marker) => marker !== null); // Filter out null values

        setIsReadOnly(isForbidden); // Set the editor to read-only if forbidden phrase is found

        if (isForbidden) {
          setShowForbiddenModal(true); // Show the modal when forbidden code is detected
        } else {
          setShowForbiddenModal(false); // Hide the modal when no forbidden code is present
        }

        return markers;
      }
      setIsReadOnly(false); // Set the editor to editable if no forbidden phrase is found
      return [];
    },
    [language, forbiddenImports]
  );

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Perform setup and configurations
    const model = editor.getModel();
    const markers = checkForForbiddenCode(editorContent);
    monaco.editor.setModelMarkers(model, "owner", markers);

    // Example configuration for TypeScript
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    // Additional configurations
  };

  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      const markers = checkForForbiddenCode(editorContent, language);
      if (markers.length > 0) {
        console.log(markers); // Debug: log the markers
      }
      monacoRef.current.editor.setModelMarkers(model, "owner", markers);
    }
  }, [editorContent, language, checkForForbiddenCode]);

  const languageBoilerplates = useMemo(
    () => ({
      python:
        "# Do Not Print Unnecesary Stuff and let the input function to \n# empty or '' ie: input()\ntestcases = int(input())\nprint(testcases)",
      java: "import java.util.Scanner;\npublic class Solution{\n  public static void main(String[] args){\n  Scanner input = new Scanner(System.in);\n  int testCases = input.nextInt();\n  System.out.println(testCases);\n}",
      c: "#include <stdio.h>\n// Do Not Print Unnecesary Stuff.ie : For Getting Input\nint main(){\n  int testcases;\n  scanf('%d',&testcases);\n  printf('%d\\n',testcases);\n  return 0;\n}",
      cpp: "#include <iostream>\nusing namespace std;\n//Do Not Print UnRelated Stuff(ie: for Getting Input)\nint main(){\n  int testCases;\n  cin>>testCases;\n  cout<<testCases<<endl;\n}",
      csharp:
        "using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine('Hello, World!');\n    }\n}",
      javascript:
        "//Make Sure Your Input Field is always ''\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n  input : process.stdin,\n  output : process.stdout,\n});\n\nrl.question('',(tst)=> {\n  const numoftestcases = parseInt(tst);\n\n  const numoftestcases;\n  rl.close();\n})",
      typescript:
        "//Make Sure Your Input Field is always ''\n\nconst readline = require('readline');\n\nconst rl = readline.createInterface({\n  input : process.stdin,\n  output : process.stdout,\n});\n\nconst testCases : number[] = [];\nrl.question('',(tst : string)=> {\n  const numoftestcases : number = parseInt(tst);\n\n  console.log(numoftestcases);\n  rl.close();\n})",
      php: "<?php\n// Make Sure Your Input Field is always empty or set to ''\n$tst = intval(readline());\necho $tst . PHP_EOL;\n?>",
      rust: "// // Do Not Print Unnecesary Stuff.ie : For Getting Input\nuse std::io;\n\nfn main() {\n    let mut testcases = String::new();\n\n    io::stdin()\n        .read_line(&mut testcases)\n        .expect('Failed to read line');\n\n    let testcases: i32 = testcases\n        .trim()\n        .parse()\n        .expect('Invalid input. Please enter a valid integer.');\n\n    println!('{}', testcases);\n}",
    }),
    []
  );

  useEffect(() => {
    if (languageBoilerplates[language]) {
      setEditorContent(languageBoilerplates[language]);
    }
  }, [language, languageBoilerplates, setEditorContent]);

  return (
    <>
      <Box
        sx={{
          marginTop: "19px",
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
            bgcolor: "background.paper",
            boxShadow: "0px 4px rgba(0, 0, 0, 0.15)",
          }}
        >
          <StyledSelect
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <MenuItem value="python">Python</MenuItem>
            <MenuItem value="rust">Rust</MenuItem>
            <MenuItem value="java">Java</MenuItem>
            <MenuItem value="c">C</MenuItem>
            <MenuItem value="cpp">C++</MenuItem>
            <MenuItem value="csharp">C#</MenuItem>
            <MenuItem value="javascript">JavaScript</MenuItem>
            <MenuItem value="typescript">TypeScript</MenuItem>
            <MenuItem value="php">PHP</MenuItem>
          </StyledSelect>
          <StyledIconButton
            onClick={() => setEditorContent(languageBoilerplates[language])}
            color="primary"
          >
            <FontAwesomeIcon icon={faUndo} />
          </StyledIconButton>
        </Box>
        <Editor
          height="100%"
          language={language}
          theme="vs-light"
          value={solvedCode !== "" ? solvedCode : editorContent}
          onChange={setEditorContent}
          onMount={handleEditorDidMount}
          options={{
            readOnly: isReadOnly,
            autoClosingBrackets: "always",
            autoClosingQuotes: "always",
            autoSurround: "languageDefined",
            automaticLayout: true,
            folding: true,
            dragAndDrop: true,
            highlightActiveIndentGuide: true,
            minimap: { enabled: true },
            renderWhitespace: "boundary",
            scrollBeyondLastLine: true,
            lineNumbers: "on",
            tabCompletion: "on",
            wordWrap: "on",
          }}
        />
      </Box>
      <ForbiddenModal
        open={showForbiddenModal}
        aria-labelledby="forbidden-modal-title"
        aria-describedby="forbidden-modal-description"
      >
        <ModalContent>
          <CloseButton onClick={handleModalClose}>
            <CloseIcon />
          </CloseButton>
          <h2 id="forbidden-modal-title">Forbidden Code Detected</h2>
          <p id="forbidden-modal-description">
            Please refrain from writing this line of code again.
          </p>
        </ModalContent>
      </ForbiddenModal>
    </>
  );
};

export default CodeEditor;
