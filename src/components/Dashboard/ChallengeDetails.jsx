import React from "react";
import styles from "./ChallengeDetails.module.css"; // Import the CSS module

const ChallengeDetails = () => {
  // Mock data for the challenge details
  const challengeDetails = {
    Name: "Sample Challenge",
    Description: "This is a sample description of the challenge.",
    ProblemStatement: "Here is the problem statement for the challenge.",
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
            <div
              className={styles.value}
              style={{ "--content-width": `${value.length + 18}px` }}
            >
              {value}
            </div>
          </div>
        ))}
      </form>
      <button type="submit" className={styles.submitButton}>
        Save Changes
      </button>
    </div>
  );
};

export default ChallengeDetails;
