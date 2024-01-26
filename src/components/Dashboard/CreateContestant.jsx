// CreateContestant.jsx
import React, { useState } from "react";
import styles from "./CreateContestant.module.css";

const CreateContestant = () => {
  const [numberOfUsers, setNumberOfUsers] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Creating ${numberOfUsers} contestant users`);
    // Implement the logic to create users here or call an API
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <svg className={styles.icon} /* Add your SVG code here */ />
        <h2 className={styles.title}>Create Contestant Users</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="numberOfUsers" className={styles.inputLabel}>
              How many users do you want to create?
            </label>
            <input
              type="number"
              id="numberOfUsers"
              className={styles.inputField}
              value={numberOfUsers}
              onChange={(e) => setNumberOfUsers(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateContestant;
