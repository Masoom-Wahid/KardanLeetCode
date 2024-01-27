import React, { useState, useEffect } from "react";
import { useCodeMirror } from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { basicSetup } from "@codemirror/basic-setup";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import styles from "./PythonEditor.module.css";

const PythonEditor = () => {
  const [code, setCode] = useState("# Write your Python code here\n");
  const [editor, setEditor] = useState(null);

  const { setContainer } = useCodeMirror({
    direction: "ltr",
    selectLeft: true,
    value: code,
    extensions: [
      basicSetup,
      keymap.of(defaultKeymap),
      python(),
      oneDark,
      // Add other extensions such as lint, autocomplete, etc.
    ],
    onChange: (value, viewUpdate) => {
      setCode(value);
    },
  });

  useEffect(() => {
    if (editor) {
      // Additional configurations or event listeners for the editor
    }
  }, [editor]);

  return (
    <div
      ref={setContainer}
      className={styles.editorContainer}
      style={{ height: "500px", border: "1px solid black" }}
    />
  );
};

export default PythonEditor;
