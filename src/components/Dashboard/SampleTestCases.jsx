import React, { useState } from "react";
import styles from "./SampleTestCases.module.css"; // CSS Module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const SampleTestCases = () => {
  const [inputText, setInputText] = useState(""); // Initialize with empty string
  const [outputText, setOutputText] = useState(""); // Initialize with empty string
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTestCaseClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const [testCases] = useState([
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

  return (
    <div className={styles.container}>
      <div className={styles.testCasesTabContainer}>
        <h1 className={styles.testCasesTitle}>Sample Test Cases</h1>
        <table className={styles.testCasesTable}>
          <thead>
            <tr>
              <th>No</th>
              <th>Order</th>
              <th>Input</th>
              <th>Output</th>
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
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.addButtonContainer}>
          <button className={styles.addButton} onClick={handleAddTestCaseClick}>
            Add Test Cases
          </button>
        </div>
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Add Test Cases</h2>
                <button
                  className={styles.closeButton}
                  onClick={handleCloseModal}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Input</label>

                <textarea
                  className={styles.inputArea}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter input..."
                ></textarea>
              </div>
              <div className={styles.outputGroup}>
                <label className={styles.outputLabel}>Output</label>

                <textarea
                  className={styles.outputArea}
                  value={outputText}
                  onChange={(e) => setOutputText(e.target.value)}
                  placeholder="Enter output..."
                ></textarea>
              </div>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.addTestCaseButton}
                  onClick={handleCloseModal}
                >
                  Add Test Case
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <button type="submit" className={styles.submitButton}>
        Save Changes
      </button>
    </div>
  );
};

export default SampleTestCases;
