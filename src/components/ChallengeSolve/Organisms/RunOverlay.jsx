import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./RunOverlay.module.css";

const formatMultilineText = (text) => {
  return text.split("\n").map((line, index) => <div key={index}>{line}</div>);
};

const RunOverlay = ({ isOpen, onClose, testData }) => {
  if (!isOpen) return null;

  const { tests, expected, actual, error, errorType } = testData;

  const getTestStatus = () => {
    const hasError = tests.some((test) => test.status === "error");
    const hasMismatch = tests.some((test) => test.status === "fail");
    const allPassed = tests.every((test) => test.status === "pass");

    if (hasError) {
      return {
        message:
          "Unfortunately, there seems to be a problem with your answer. Error: " +
          error,
        type: "error",
        statusType: "hasError",
      };
    } else if (hasMismatch) {
      return {
        message: "There seems to be a mismatch in the answer.",
        type: "mismatch",
        statusType: "hasMismatch",
      };
    } else if (allPassed) {
      return {
        message: "Congrats! Your answer is correct!",
        type: "success",
        statusType: "allPassed",
      };
    }
    return { message: "", type: "", statusType: "" };
  };

  const testStatus = getTestStatus();
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className={styles.title}>Test Cases</h2>
        <ul className={styles.testList}>
          {tests.map((test) => (
            <li key={test.id} className={styles.testItem}>
              <span>{test.name}</span>
              {test.status === "loading" ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className={`${styles.iconLoading}`}
                  spin
                />
              ) : test.status === "pass" ? (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className={styles.iconCorrect}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className={styles.iconIncorrect}
                />
              )}
            </li>
          ))}
        </ul>
        <div
          className={
            styles.explanationContainer + " " + styles[testStatus.type]
          }
        >
          {errorType === "hasMismatch" && (
            <>
              {testStatus.message}
              <div className={styles.mismatchDetails}>
                <div>
                  <strong>Expected Answer:</strong>{" "}
                  <div className={styles.multilineText}>
                    {formatMultilineText(expected)}
                  </div>
                </div>
                <div>
                  <strong>Your Answer:</strong>{" "}
                  <div className={styles.multilineText}>
                    {formatMultilineText(actual)}
                  </div>
                </div>
              </div>
            </>
          )}

          {errorType === "hasError" && (
            <div className={styles.errorDetails}>
              {/* Display specific content for error case */}
              <div>
                <strong>Error Details:</strong> {error}
              </div>
            </div>
          )}

          {errorType === "allPassed" && (
            <div className={styles.successDetails}>
              {/* Display specific content for all passed case */}
              <div>Congratulations! All tests passed successfully.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RunOverlay;
