import React, { useState } from "react";
import styles from "./DescriptionBox.module.css";

const DescriptionBox = () => {
  const [tabValue, setTabValue] = useState(0);

  const problemDetails = {
    title: "Two Sum",
    difficulty: "Easy",
    description:
      "Given an array of integers 'nums' and an integer 'target', return indices of the two numbers such that they add up to 'target'.",
    examples: [
      {
        id: 1,
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      // ... other examples if any
    ],
  };

  return (
    <div className={styles.descriptionBox}>
      <div className={styles.tabContainer}>
        <div
          className={`${styles.tab} ${
            tabValue === 0 ? styles.tabSelected : ""
          }`}
          onClick={() => setTabValue(0)}
        >
          Description
        </div>
        <div
          className={`${styles.tab} ${
            tabValue === 1 ? styles.tabSelected : ""
          }`}
          onClick={() => setTabValue(1)}
        >
          Submissions
        </div>
      </div>
      {tabValue === 0 && (
        <div className={styles.contentBox}>
          <h5 className={styles.title}>{problemDetails.title}</h5>
          <div className={styles.difficulty}>
            Difficulty: {problemDetails.difficulty}
          </div>
          <p className={styles.description}>{problemDetails.description}</p>
          {problemDetails.examples.map((example) => (
            <div key={example.id} className={styles.exampleBox}>
              <p className={styles.exampleInput}>
                <b>Input:</b> {example.input}
              </p>
              <p className={styles.exampleOutput}>
                <b>Output:</b> {example.output}
              </p>
              <p className={styles.exampleExplanation}>
                <b>Explanation:</b> {example.explanation}
              </p>
            </div>
          ))}
        </div>
      )}
      {/* Additional content for other tab values can be added here */}
    </div>
  );
};

export default DescriptionBox;
