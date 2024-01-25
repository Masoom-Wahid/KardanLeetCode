// DescriptionModal.js
import React from "react";
import styles from "./DescriptionModal.module.css"; // Assume you have styles defined here

const DescriptionModal = ({ title, description, onClose }) => {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </div>
        <div className={styles.modalContent}>
          <h4>Description</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionModal;
