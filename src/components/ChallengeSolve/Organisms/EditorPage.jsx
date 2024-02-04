import React, { useState,useEffect } from "react";
import {useParams} from 'react-router-dom'
import { Box, CssBaseline } from "@mui/material";
import MainHeader from "./Header/MainHeader";
import DescriptionBox from "./Description/DescriptionBox";
import CodeEditor from "./Editor/CodeEditor";
import {useNavigate} from 'react-router-dom'
import TestCases from "./ManualTestCase/TestCases";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "./EditorPage.css";
import createModalTestCaseResult from './Editor/ModalTestCaseCreater';

const BASE_URL = process.env.REACT_APP_API_URL;

const EditorPage = () => {
  const [mode, setMode] = useState("light");
  const [editorContent, setEditorContent] = useState("");
  const [challenge,setChallenge] = useState([])
  const [readOnly,setReadOnly] = useState(false)
  const [solvedCode,setSolvedCode] = useState("")
  const [language, setLanguage] = useState("python");
  const [runConfetti, setRunConfetti] = useState(false);
  const [contestFinished,setContestFinished] = useState(false)
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [descriptionWidth, setDescriptionWidth] = useState(
    window.innerWidth / 2
  );
  const [editorWidth, setEditorWidth] = useState(window.innerWidth / 2);
  const [manualTestCase,setManualTestCase] = useState("")
  const [testCaseData,setTestCaseData] = useState()


  const navigate = useNavigate();

  // eslint-disable-next-line
  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}competition/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          console.log(response.status);
          // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is
          // either bypassing
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setChallenge(data);
        setSolvedCode(data.question.code)
        data.question.code !== "" ? setReadOnly(true) : setReadOnly(false)
        // Process the data
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };
    fetchData();
  }, []);


  const SubmitFile = async (type) => {
    const blob = new Blob([editorContent], { type: "text/plain" });
    const formData = new FormData();
    formData.append("code", blob, "filename.txt");
    formData.append("id", id);
    formData.append("lang", language);
    formData.append("type", type);
    if(type === "manual") { formData.append("manual_testcase",manualTestCase) }

    try {
      const response = await fetch(`${BASE_URL}competition/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData,
      });


      /*
      423 means the contest is finished 
      412 means that the user has no group , so it would be the best to kick him out
      */
      if(response.status === 423 ){
        setContestFinished(true)
      }else if(response.status === 412){
        localStorage.removeItem("accessToken");
        navigate("/")
      }else{
        const data = await response.json();
        // Total is the number of test cases , for run we have 2 other the num_of_test_cases
        let total = type === "run" ? 2 : challenge.question.num_of_test_cases;

        
      // For Manual We Return The data and we dont care about status 
        if (type === "manual") {
          return {
            error: data["detail"]["output"] === undefined ? true : false,
            output:
              data["detail"]["output"] === undefined
                ? data["detail"]["error"]
                : data["detail"]["output"],
          };
        } else if (response.status === 200) {
          // Else We Create a Model and run The confetti
          let amount_solved = data["detail"]["amount_solved"]
            ? data["detail"]["amount_solved"]
            : total;
          setTestCaseData(
            createModalTestCaseResult(total, amount_solved, data, type)
          );
          if (type === "submit") {
            setRunConfetti(true);
            console.log("clicked on cofetti");
          }
        } else if (response.status === 406) {
          // 406 means bad answer and the result of those is handled in createModalTestCaseResult
          let amount_solved = data["detail"]["amount_solved"]
            ? data["detail"]["amount_solved"]
            : 0;
          setTestCaseData(
            createModalTestCaseResult(total, amount_solved, data, type)
          );
        }
      }

      }catch(error){
      console.error(error)
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
          <MainHeader 
          readOnly={readOnly}
          runConfetti={runConfetti} 
          onSubmit={SubmitFile} 
          testCaseData={testCaseData}
          />
          <Box sx={{ display: "flex", p: 0 }}>
            {/* <ResizableBox
              width={descriptionWidth}
              height="100%"
              minConstraints={[200, 300]} // Minimum width and height
              maxConstraints={[window.innerWidth - 200, 600]}
              handle={<span className="react-resizable-handle" />}
              onResize={(event, { size }) => {
                setDescriptionWidth(size.width);
                setEditorWidth(window.innerWidth - size.width);
              }}
              axis="x"
            > */}
            <DescriptionBox 
            questionId={id}
            challenge={challenge}
            contestFinished={contestFinished}
            setContestFinished={setContestFinished}
             />

            {/* </ResizableBox> */}

            <Box
              sx={{
                width: `${editorWidth}px`,
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
                  readOnly={readOnly}
                  solvedCode={solvedCode}
                  language={language}
                  setLanguage={setLanguage}
                />
              </Box>
              <Box sx={{ flexGrow: 0, flexShrink: 0, flexBasis: 0 }}>
                <TestCases
                onSubmit={SubmitFile}
                manualTestCase={manualTestCase}
                setManualTestCase={setManualTestCase}
                 />
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default EditorPage;
