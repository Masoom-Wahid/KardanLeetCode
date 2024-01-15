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
        theme="vs-light"
        value={editorContent}
        onChange={setEditorContent}
      />
    </Box>
  );
};

export default CodeEditor;