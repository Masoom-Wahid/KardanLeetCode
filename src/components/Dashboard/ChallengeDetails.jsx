import React from "react";
import styles from "./ChallengeDetails.module.css"; // Import the CSS module

const ChallengeDetails = () => {
  // Updated mock data for the challenge details
  const challengeDetails = {
    Name: "Sample Challenge",
    Level: "Easy",
    Points: "50",
    TimeLimit: "120 seconds",
    NumberOfTestCases: "3",
    Description: "This is a sample description of the challenge.",
    InputFormat: "Expected input format details.",
    Constraints: "List of constraints for the challenge.",
    OutputFormat: "Expected output format details.",
  };

  return (
    <div className={styles.challengeDetailsContainer}>
      <h1 className={styles.title}>
        This is the basic information that describes your challenge.
      </h1>
      <form className={styles.form}>
        {Object.entries(challengeDetails).map(([key, value]) => (
          <div key={key} className={styles.formGroup}>
            <label className={styles.label}>
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              className={styles.value}
              style={{ "--content-width": `${value.length + 18}px` }}
              placeholder={value}
            ></input>
          </div>
        ))}
      </form>
      <span className={styles.buttons}>
        <button type="submit" className={styles.submitButton}>
          Save Changes
        </button>
        <button type="submit" className={styles.updateButton}>
          Update
        </button>
      </span>
    </div>
  );
};

export default ChallengeDetails;
