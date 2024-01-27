import React, { useState } from "react";
import styles from "./TestCases.module.css";

const TestCases = () => {
  const [mainTabValue, setMainTabValue] = useState(0);

  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [finalOutput, setFinalOutput] = useState("Something");

  return (
    <div className={styles.testCasesContainer}>
      <div className={styles.mainTabs}>
        <div
          className={`${styles.tab} ${
            mainTabValue === 0 ? styles.tabSelected : ""
          }`}
          onClick={() => setMainTabValue(0)}
        >
          Manual Test Cases
        </div>
        <div
          className={`${styles.tab} ${
            mainTabValue === 1 ? styles.tabSelected : ""
          }`}
          onClick={() => setMainTabValue(1)}
        >
          Test Results
        </div>
      </div>
      {mainTabValue === 0 && (
        <div className={styles.testCasesContent}>
          <div className={styles.inputGroup}>
            <label className={styles.testCaseLabel}>Enter Your Input</label>
            <input
              type="text"
              className={styles.testCaseInput}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your input"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.testCaseLabel}>Enter Your Output</label>
            <input
              type="text"
              className={styles.testCaseInput}
              value={outputValue}
              onChange={(e) => setOutputValue(e.target.value)}
              placeholder="Enter your output"
            />
          </div>
        </div>
      )}
      {mainTabValue === 1 && (
        <div className={styles.testResultContent}>
          <div className={styles.finalOutputLabel}>FINAL OUTPUT</div>
          <div className={styles.finalOutputValue}>{finalOutput}</div>
        </div>
      )}
    </div>
  );
};

export default TestCases;
