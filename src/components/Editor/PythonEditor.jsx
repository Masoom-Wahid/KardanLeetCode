import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import styles from "./PythonEditor.module.css";

const PythonEditor = () => {
  const [code, setCode] = useState("# Write your Python code here\n");

  const handleEditorChange = (value, event) => {
    setCode(value);
  };

  return (
    <div
      className={styles.editorContainer}
      style={{ height: "500px", border: "1px solid black" }}
    >
      <Editor
        height="100%"
        defaultLanguage="python"
        defaultValue={code}
        onChange={handleEditorChange}
        theme="vs-dark" // or "vs-light"
        // Additional configurations here
      />
    </div>
  );
};

export default PythonEditor;
