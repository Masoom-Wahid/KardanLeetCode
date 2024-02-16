import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar"; // Assuming you have this component ready
import styles from "./CreateContest.module.css"; // The CSS module for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CreateContest = () => {
  const [contestName, setContestName] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();
    // Since Duration is in this format
    const duration = `${hours}:${minutes}:${seconds}`;
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}contest/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ name: contestName, duration: duration }),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Whenever you wanted to use the variable data please remove the next line.
      // eslint-disable-next-line
      const createdContest = await response.json();
      const { id } = createdContest;
      navigate(`/contests/${id}`);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
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
              onChange={(event) => setContestName(event.target.value)}
              required
            />
            <label htmlFor="duration" className={styles.label}>
              Duration
            </label>
            <div className={styles.durationContainer}>
              <input
                type="number"
                id="hours"
                min={0}
                max={12}
                className={styles.durationInput}
                placeholder="Hours"
                onChange={(event) => setHours(event.target.value)}
                required
              />
              <input
                type="number"
                id="minutes"
                min={0}
                max={60}
                className={styles.durationInput}
                placeholder="Minutes"
                onChange={(event) => setMinutes(event.target.value)}
                required
              />
              <input
                type="number"
                id="seconds"
                min={0}
                max={60}
                className={styles.durationInput}
                placeholder="Seconds"
                onChange={(event) => setSeconds(event.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={styles.button}
              onClick={(event) => handleClick(event)}
            >
              {loading ? "Creating....." : "Next"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateContest;
