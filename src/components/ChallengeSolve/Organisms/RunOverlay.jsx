import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./RunOverlay.module.css";

const RunOverlay = ({ isOpen, onClose, testData }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className={styles.title}>Test Cases</h2>
        <ul className={styles.testList}>
          {testData.map((test) => (
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
      </div>
    </div>
  );
};

export default RunOverlay;
