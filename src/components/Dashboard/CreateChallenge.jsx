import React, { useState } from "react";
import Sidebar from "./Sidebar";
import styles from "./CreateChallenge.module.css";
import { useNavigate } from "react-router-dom";

const CreateChallenge = () => {
  // State management for new fields
  const [level, setLevel] = useState("Easy");
  const [points, setPoints] = useState("");
  const [timeLimit, setTimeLimit] = useState(10);
  const [numTestCases, setNumTestCases] = useState("");
  const navigate = useNavigate();

  // Other state variables and handlers would go here

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.createChallengeContainer}>
        <h1 className={styles.title}>Create a Challenge</h1>
        <p className={styles.subtitle}>Provide the initial information here.</p>
        <form className={styles.challengeForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Challenge Name</label>
            <input type="text" className={styles.formInput} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Level</label>
            <select
              className={styles.formInput}
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Points</label>
            <input
              type="number"
              className={styles.formInput}
              value={points}
              onChange={(e) => setPoints(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Time Limit (seconds)</label>
            <input
              type="number"
              className={styles.formInput}
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Number of Test Cases</label>
            <input
              type="number"
              className={styles.formInput}
              value={numTestCases}
              onChange={(e) => setNumTestCases(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description</label>
            <textarea className={styles.formTextarea} rows="3" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Input Format</label>
            <textarea className={styles.formTextarea} rows="3" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Constraints</label>
            <textarea className={styles.formTextarea} rows="3" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Output Format</label>
            <textarea className={styles.formTextarea} rows="3" />
          </div>

          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.addButton}
              onClick={() => navigate("/challengedetails")}
            >
              Add Challenge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChallenge;
