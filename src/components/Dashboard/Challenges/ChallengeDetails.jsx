import React, { useState } from "react";
import styles from "./ChallengeDetails.module.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";

const ChallengeDetails = ({ question, setQuestion }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setQuestion((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}questions/${question.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(question),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setQuestion(data);
      setLoading(false);
      // Handle the response from the backend
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <div className={styles.challengeDetailsContainer}>
      <h1 className={styles.title}>
        This is the basic information that describes your challenge.
      </h1>
      {question && (
        <form className={styles.form}>
          {Object.entries(question).map(
            ([key, value]) =>
              key !== "id" &&
              key !== "contest" && (
                <div key={key} className={styles.formGroup}>
                  <label className={styles.label}>
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    className={styles.value}
                    style={{ "--content-width": `${value.length + 18}px` }}
                    placeholder={value}
                    name={key} // Add the name attribute for form field
                    value={value}
                    onChange={handleFieldChange}
                  ></input>
                </div>
              )
          )}
        </form>
      )}
      <span className={styles.buttons}>
        <button
          type="submit"
          className={styles.submitButton}
          onClick={(event) => handleUpdate(event)}
        >
          {loading ? "Updating....." : "Save Changes"}
        </button>
      </span>
    </div>
  );
};

export default ChallengeDetails;
