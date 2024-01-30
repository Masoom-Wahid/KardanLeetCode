import React, { useState } from "react";
import styles from "./TestCases.module.css";

const TestCases = ({onSubmit,manualTestCase,setManualTestCase}) => {
  const [mainTabValue, setMainTabValue] = useState(0);
  const [loading,setLoading] = useState(false)
  /*
  Dont Delete The BoilerPlate , This Is A Better Way To Handle It Then Going To Error Check
  Everywhere
  */
  const [finalOutput, setFinalOutput] = useState(
              {
                "error":false,
                "output":"Run Your TestCases So They Would Show here"
              }  
    );

  const formatMultilineText = (text) => {
    return text.split("\n").map((line, index) => <div key={index}>{line}</div>);
  };

  const runTestCase = async () => {
    setLoading(true)
    let result = await onSubmit("manual")
    console.log(result)
    setFinalOutput(result)
    setMainTabValue(1)
    setLoading(false)
  };


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
        <div className={styles.container}>
          <div className={styles.testCasesContent}>
            <div className={styles.inputGroup}>
              <label className={styles.testCaseLabel}>Enter Your Input</label>
              <textarea
                className={styles.testCaseInput}
                value={manualTestCase}
                onChange={(e) => setManualTestCase(e.target.value)}
                placeholder="Enter your input"
              />
            </div>
          </div>
          <button className={styles.runTestCaseButton} onClick={runTestCase}>
            { loading ? "Running......" : "Run Test Case"}
          </button>
        </div>
      )}
      {mainTabValue === 1 && (
        <div className={styles.testResultContent}>
          <div className={styles.finalOutputLabel} style={finalOutput["error"] ? {color:"red"} : {color:"green"}} >
          {finalOutput["error"] ? "Error" : "Compiled Succesfully"}
          </div>
          <div className={styles.finalOutputValue}>
            <div className={styles.multilineText}>
              { finalOutput["output"]?.length !== 0 && formatMultilineText(finalOutput["output"])}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCases;
