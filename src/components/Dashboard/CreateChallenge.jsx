import React from "react";
import Sidebar from "./Sidebar";
import styles from "./CreateChallenge.module.css";

const CreateChallenge = () => {
  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.createChallengeContainer}>
        <h1 className={styles.title}>Create a Challenge</h1>
        <p className={styles.subtitle}>Provide the initial information here.</p>
        <form className={styles.challengeForm}>
          <label className={styles.formLabel}>
            Challenge Name
            <input type="text" className={styles.formInput} />
          </label>
          <label className={styles.formLabel}>
            Description
            <textarea className={styles.formTextarea} />
          </label>
          <label className={styles.formLabel}>
            Problem Statement
            <textarea className={styles.formTextarea} />
          </label>
          <label className={styles.formLabel}>
            Input Format
            <textarea className={styles.formTextarea} />
          </label>
          <label className={styles.formLabel}>
            Constraints
            <textarea className={styles.formTextarea} />
          </label>
          <label className={styles.formLabel}>
            Output Format
            <textarea className={styles.formTextarea} />
          </label>
          <button type="submit" className={styles.addButton}>
            Add Challenge
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateChallenge;
