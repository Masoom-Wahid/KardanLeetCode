import React from "react";
import MonacoEditor from "@monaco-editor/react";
import styles from "./SubmissionDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

// Mock data for the editor content
const mockData = `# Do Not Print Unnecessary Stuff and let the input function to
# empty or '' ie: input()
testcases = int(input())
print(testcases)`;

const SubmissionDetail = () => {
  return (
    <>
      <h1 className={styles.title}>Submission Details</h1>
      <div className={styles.codeEditorContainer}>
        <div className={styles.editorHeader}>
          <FontAwesomeIcon icon={faCode} className={styles.icon} />
          <h1 className={styles.editorTitle}>Alpha Submission Number 12</h1>
        </div>
        <MonacoEditor
          className={styles.monaco}
          height="500px"
          language="python"
          value={mockData}
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
  );
};

export default SubmissionDetail;
