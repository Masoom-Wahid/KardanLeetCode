import React, { useState } from "react";
import styles from "./AddChallengeModal.module.css";

const AddChallengeModal = ({ closeModal }) => {
  const [challengeInput, setChallengeInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Dummy function to simulate searching for challenges
  const searchChallenges = (input) => {
    // This should be an API call or search logic
    const dummyResults = [
      "Two Sums",
      "Two Sums of Numbers",
      "Two Sums of Letters",
    ];
    setSuggestions(
      dummyResults.filter((item) =>
        item.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  const handleInputChange = (event) => {
    const input = event.target.value;
    setChallengeInput(input);
    searchChallenges(input);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Add Challenge</h2>
        <label className={styles.subtitle} htmlFor="challenge-name">
          Enter The Name or ID of the Challenge
        </label>
        <input
          id="challenge-name"
          type="text"
          value={challengeInput}
          onChange={handleInputChange}
          autoComplete="off"
        />
        {challengeInput && (
          <ul className={styles.suggestions}>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => setChallengeInput(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <button className={styles.add} onClick={closeModal}>
          ADD
        </button>
      </div>
      <div className={styles.modalOverlay} onClick={closeModal} />
    </div>
  );
};

export default AddChallengeModal;
