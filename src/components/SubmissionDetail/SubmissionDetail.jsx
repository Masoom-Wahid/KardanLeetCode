import React,{useEffect,useState} from "react";
import MonacoEditor from "@monaco-editor/react";
import styles from "./SubmissionDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import {useParams,useNavigate} from 'react-router-dom';

// Mock data for the editor content
const mockData = `# Do Not Print Unnecessary Stuff and let the input function to
# empty or '' ie: input()
testcases = int(input())
print(testcases)`;

const SubmissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subData,setSubData] = useState();
  const [error,setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}competition/submissions/?id=${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is
          // either bypassing
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          if (response.status === 400){
            setError(true)
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setSubData(data);
        // Process the data
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };
    fetchData();
  },[]);


  return (
    <div>
      {
        subData && (

          error ? 
          <div>

          <h1>Error 400 , Contact Admin</h1>

          </div>
          
          :
          <>
            <h1 className={styles.title}>
            <span style={subData.solved ? {color:"green"} : {color : "red"}}>{subData.solved ? "Solved  " : "Rejected  "}</span> 
            </h1>
            <div className={styles.codeEditorContainer}>
              <div className={styles.editorHeader}>
                <FontAwesomeIcon icon={faCode} className={styles.icon} />
                <h1 className={styles.editorTitle}>{`${subData.lang.toUpperCase()}  ${subData.question}`}</h1>
              </div>
              <MonacoEditor
                className={styles.monaco}
                height="500px"
                language={subData.lang}
                value={subData.code}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  fontSize: 16,
                  fontFamily: '"Josefin Sans", sans-serif',
                }}
              />
            </div>
        </>
          )
      }
    </div>
  );
};

export default SubmissionDetail;