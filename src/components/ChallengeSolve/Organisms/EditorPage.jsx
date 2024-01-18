import React, { useEffect, useState } from "react";
import { Box, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import MainHeader from "./MainHeader";
import DescriptionBox from "./DescriptionBox";
import CodeEditor from "./CodeEditor";
import {useNavigate} from "react-router-dom";
import TestCases from "./TestCases";
import NavigationBar from "../../NavBar/Navbar";


const BASE_URL = process.env.REACT_APP_API_URL;
const QUESTION_ID = 21


const EditorPage = () => {
  const [mode, setMode] = useState("light");
  const [editorContent, setEditorContent] = useState("");
  const [language, setLanguage] = useState("python");

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };


  const SubmitFile = async (type) => {
    const blob = new Blob([editorContent], { type: 'text/plain' });
    const formData = new FormData();
    formData.append('code', blob, 'filename.txt');
    formData.append("id",QUESTION_ID)
    formData.append("lang",language)
    formData.append("type",type)


    try {
      const response = await fetch(`${BASE_URL}competition/`, {
        method: 'POST',
        headers : {
          "Authorization":`Bearer ${localStorage.getItem("accessToken")}`
        },
        body: formData,
      });
      const data = await response.json()
      console.log(data)
      if(!response.ok){
        window.alert(`You Did Not Solve This Problem with the status of ${response.status} and ${data.detail.reason}`)
      }else{
        window.alert(`You Did  Solve This Problem with the status of ${response.status} and ${data.detail.reason}`)
      }

      // Handle the response from the backend
    } catch (error) {
      // Handle errors
      console.error(error);
    }
    
  }
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
          <MainHeader onSubmit ={SubmitFile} />
          <Box sx={{ display: "flex", flexGrow: 1, p: 0 }}>
            <DescriptionBox   sx={{ flexBasis: "auto", flexGrow: 0 }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                p: 0,
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <CodeEditor editorContent={editorContent} setEditorContent={setEditorContent}  language = {language} setLanguage={setLanguage} />
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
