import React from "react";
import Sidebar from "./Sidebar"; // Assuming you have this component ready
import styles from "./CreateContest.module.css"; // The CSS module for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CreateContest = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.mainContainer}>
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            {/* Replace 'IconComponent' with the actual imported icon */}
            <FontAwesomeIcon icon={faUsers} className={styles.icon} />
          </div>
          <h1 className={styles.title}>Create a contest</h1>
          <form className={styles.form}>
            <label htmlFor="contestName" className={styles.label}>
              Contest Name
            </label>
            <input
              type="text"
              id="contestName"
              className={styles.input}
              placeholder="Enter The Name of The Contest"
            />
            <label htmlFor="duration" className={styles.label}>
              Duration
            </label>
            <div className={styles.durationContainer}>
              <input
                type="number"
                id="hours"
                className={styles.durationInput}
                placeholder="Hours"
              />
              <input
                type="number"
                id="minutes"
                className={styles.durationInput}
                placeholder="Minutes"
              />
              <input
                type="number"
                id="seconds"
                className={styles.durationInput}
                placeholder="Seconds"
              />
            </div>
            <button
              type="submit"
              className={styles.button}
              onClick={() => navigate("/challenges")}
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateContest;
