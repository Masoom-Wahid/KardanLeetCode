import React, { useState } from "react";
import styles from "./TestCasesTab.module.css"; // CSS Module

const TestCasesTab = () => {
  const [testCases, setTestCases] = useState([
    // This should be fetched or passed in from a parent component
    {
      no: "1",
      order: 0,
      input: "Input00.txt",
      output: "Output00.txt",
      sample: true,
    },
    {
      no: "2",
      order: 1,
      input: "Input01.txt",
      output: "Output01.txt",
      sample: false,
    },
    {
      no: "3",
      order: 2,
      input: "Input02.txt",
      output: "Output02.txt",
      sample: false,
    },
  ]);

  const handleCheckboxChange = (index) => {
    const updatedTestCases = testCases.map((testCase, i) => {
      if (i === index) {
        return { ...testCase, sample: !testCase.sample }; // toggle the sample boolean
      }
      return testCase;
    });
    setTestCases(updatedTestCases);
  };

  return (
    <div className={styles.container}>
      <div className={styles.testCasesTabContainer}>
        <h1 className={styles.testCasesTitle}>Test Cases List</h1>
        <table className={styles.testCasesTable}>
          <thead>
            <tr>
              <th>No</th>
              <th>Order</th>
              <th>Input</th>
              <th>Output</th>
              <th>Sample</th>
            </tr>
          </thead>
          <tbody>
            {testCases.map((testCase, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td>{testCase.no}</td>
                <td>{testCase.order}</td>
                <td>{testCase.input}</td>
                <td>{testCase.output}</td>
                <td>
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={testCase.sample}
                    onChange={() => handleCheckboxChange(index)} // Use the function to change checkbox state
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.addButtonContainer}>
          <button className={styles.addButton}>Add Test Cases</button>
        </div>
      </div>
      <button type="submit" className={styles.submitButton}>
        Save Changes
      </button>
    </div>
  );
};

export default TestCasesTab;
