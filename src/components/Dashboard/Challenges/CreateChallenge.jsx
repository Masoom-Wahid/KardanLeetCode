import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./CreateChallenge.module.css";
import { useNavigate } from "react-router-dom";

const ContestName = "Autumn_2024";

const CreateChallenge = () => {
  // State management for new fields
  const [level, setLevel] = useState("EASY");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [points, setPoints] = useState("");
  const [timeLimit, setTimeLimit] = useState(10);
  const [numTestCases, setNumTestCases] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleClick = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}questions/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            name: ContestName,
            title: name,
            lvl: level,
            point: points,
            time_limit: timeLimit,
            num_of_test_cases: numTestCases,
            description: description,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        // Handle errors
        setLoading(false);
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setLoading(false);
      navigate(`/challenges/${data.id}`);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.createChallengeContainer}>
        <h1 className={styles.title}>Create a Challenge</h1>
        <p className={styles.subtitle}>Provide the initial information here.</p>
        <form className={styles.challengeForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Challenge Name</label>
            <input
              type="text"
              className={styles.formInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Level</label>
            <select
              className={styles.formInput}
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="EASY">Easy</option>
              <option value="MEDUIM">Medium</option>
              <option value="HARD">Hard</option>
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
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.formTextarea}
              rows="3"
            />
          </div>

          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.addButton}
              onClick={(e) => handleClick(e)}
            >
              {loading ? "Creating....." : "Add Challenge"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChallenge;
