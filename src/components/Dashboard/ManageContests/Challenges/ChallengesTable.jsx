// ChallengesTable.js
import React, { useState } from "react";
import styles from "./ChallengesTable.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import AddChallengeModal from "./AddChallengeModal";

const ChallengesTable = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const challenges = [
    { id: 1, name: "Palindrome", level: "Easy", maxScore: 10, timeLimit: "10" },
    { id: 2, name: "Sum", level: "Easy", maxScore: 10, timeLimit: "10" },
    // ... add more challenges as needed
  ];

  return (
    <>
      <div>
        <h1 className={styles.title}>Challenges</h1>
        <table className={styles.challengesTable}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Level</th>
              <th>Max Score</th>
              <th>Time Limit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {challenges.map((challenge, index) => (
              <tr key={challenge.id}>
                <td>{index + 1}</td>
                <td>{challenge.name}</td>
                <td>{challenge.level}</td>
                <td>{challenge.maxScore}</td>
                <td>{challenge.timeLimit}</td>
                <td className={styles.actionIcon}>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className={(styles.actionIcon, styles.delete)}
                  />
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    className={(styles.actionIcon, styles.edit)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={styles.addButton} onClick={toggleModal}>
          Add Challenge
        </button>
      </div>
      {showModal && <AddChallengeModal closeModal={toggleModal} />}
    </>
  );
};

export default ChallengesTable;
