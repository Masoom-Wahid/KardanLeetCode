import React, { useState } from "react";
import {useParams} from 'react-router-dom'
import { Box, CssBaseline } from "@mui/material";
import MainHeader from "./MainHeader";
import DescriptionBox from "./DescriptionBox";
import CodeEditor from "./CodeEditor";
import TestCases from "./TestCases";


const BASE_URL = process.env.REACT_APP_API_URL;

const EditorPage = () => {
  const [mode, setMode] = useState("light");
  const [editorContent, setEditorContent] = useState("");
  const [language, setLanguage] = useState("python");
  const [runConfetti,setRunConfetti] = useState(false);
  const {id} = useParams()
  // eslint-disable-next-line
  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const SubmitFile = async (type) => {
    const blob = new Blob([editorContent], { type: "text/plain" });
    const formData = new FormData();
    formData.append("code", blob, "filename.txt");
    formData.append("id", id);
    formData.append("lang", language);
    formData.append("type", type);

    try {
      const response = await fetch(`${BASE_URL}competition/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
          window.alert(
            `You Did Not Solve This Problem with the status of ${response.status} and ${data.detail.reason}`
          );
        }
       else {
        if (type == "submit"){
          setRunConfetti(true)
          setTimeout(() => {
            setRunConfetti(false)
          },3000)
        }else{
          window.alert(
            `You Did  Solve This Problem with the status of ${response.status} and ${data.detail.reason}`
          );
        }
      }

      // Handle the response from the backend
    } catch (error) {
      // Handle errors
      console.error(error);
    }
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
          <MainHeader runConfetti = {runConfetti} onSubmit={SubmitFile} />
          <Box sx={{ display: "flex", flexGrow: 1, p: 0 }}>
            <DescriptionBox 
            questionId = {id}
            sx={{ flexBasis: "auto", flexGrow: 0 }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                p: 0,
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <CodeEditor
                  editorContent={editorContent}
                  setEditorContent={setEditorContent}
                  language={language}
                  setLanguage={setLanguage}
                />
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
