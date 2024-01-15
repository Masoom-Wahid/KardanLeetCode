import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./TestCases.css";

const TestCases = () => {
  const [mainTabValue, setMainTabValue] = useState(0);
  const [selectedCase, setSelectedCase] = useState(0);

  const testCases = [
    { id: 1, input: "123", output: "456" },
    { id: 2, input: "789", output: "1011" },
    { id: 3, input: "234", output: "567" },
    { id: 4, input: "345", output: "678" },
    // ... other test cases
  ];

  return (
    <div className="test-cases-container">
      <div className="main-tabs">
        <div
          className={`tab ${mainTabValue === 0 ? "tab-selected" : ""}`}
          onClick={() => setMainTabValue(0)}
        >
          Test Cases
        </div>
        <div
          className={`tab ${mainTabValue === 1 ? "tab-selected" : ""}`}
          onClick={() => setMainTabValue(1)}
        >
          Test Results
        </div>
      </div>
      {mainTabValue === 0 && (
        <div>
          <div className="case-tabs">
            {testCases.map((testCase, index) => (
              <div
                key={index}
                className={`case-tab ${
                  selectedCase === index ? "case-tab-selected" : ""
                }`}
                onClick={() => setSelectedCase(index)}
              >
                Case {testCase.id}
              </div>
            ))}
            <button className="icon-button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          {testCases.map((testCase, index) => (
            <div
              key={index}
              className={`test-case-box ${
                selectedCase === index ? "test-case-box-active" : ""
              }`}
            >
              <div className="test-case-input-output">
                <label>Input:</label>
                <input
                  className="test-case-text-field"
                  value={testCase.input}
                  disabled
                />
              </div>
              <div className="test-case-input-output">
                <label>Output:</label>
                <input
                  className="test-case-text-field"
                  value={testCase.output}
                  disabled
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestCases;
