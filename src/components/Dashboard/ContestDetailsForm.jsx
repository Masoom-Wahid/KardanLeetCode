import React, { useState } from "react";
import DurationPicker from "./DurationPicker";
import styles from "./ContestDetailsForm.module.css";

const ContestDetailsForm = () => {
  const [duration, setDuration] = useState("");
  const [formattedDuration, setFormattedDuration] = useState("");

  const handleDurationChange = (formattedDuration) => {
    setFormattedDuration(formattedDuration);
    // Set the duration in seconds if needed for your application logic
    const [hours, minutes, seconds] = formattedDuration.split(":").map(Number);
    setDuration(hours * 3600 + minutes * 60 + seconds);
  };
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
          Duration of the contest (in minutes)
        </label>
        <div className={styles.durationInputWrapper}>
          <DurationPicker onChange={handleDurationChange} />
          <span className={styles.formattedDuration}>
            {formattedDuration && `Duration: ${formattedDuration}`}
          </span>
        </div>
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
