// LoadingOverlay.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styles from "./LoadingOverlay.module.css";

const LoadingOverlay = () => {
  return (
    <div className={styles.loadingOverlay}>
      <FontAwesomeIcon
        icon={faSpinner}
        className={`${styles.iconLoading}`}
        spin
      />
    </div>
  );
};

export default LoadingOverlay;
