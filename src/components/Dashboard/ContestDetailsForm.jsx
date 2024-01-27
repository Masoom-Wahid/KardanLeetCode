// ContestDetailsForm.js
import React from "react";
import styles from "./ContestDetailsForm.module.css";

const ContestDetailsForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label htmlFor="contestName" className={styles.label}>
          Contest Name
        </label>
        <input
          type="text"
          id="contestName"
          className={styles.input}
          defaultValue="Kardan University Contest"
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="duration" className={styles.label}>
          Duration of the contest
        </label>
        <input
          type="text"
          id="duration"
          className={styles.input}
          defaultValue="02:00:00"
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="description" className={styles.label}>
          Contest Description
        </label>
        <textarea
          id="description"
          className={styles.textarea}
          defaultValue="For all the students of kardan university"
        ></textarea>
      </div>
    </div>
  );
};

export default ContestDetailsForm;
