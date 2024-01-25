import React from "react";
import Sidebar from "./Sidebar";
import styles from "./ManageContests.module.css"; // Make sure to create a CSS module file for this
import { useNavigate } from "react-router-dom";

const contests = [
  {
    id: 1,
    title: "Kardan University Contest",
    description:
      "This is a brief description of the contest with a normal amount of information.",
  },
];

const ManageContests = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.manageContests}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.titles}>
          <h1 className={styles.title}>Manage Contests</h1>
          <h2 className={styles.subtitle}>Select a contest</h2>
        </div>
        <div className={styles.cardsContainer}>
          {contests.map((contest) => (
            <div key={contest.id} className={styles.card}>
              <div
                className={styles.imagePlaceholder}
                // if you want to get the image from the api, do it like this
                // style={{ backgroundImage: `url(${contest.imageUrl})` }}
                style={{ backgroundImage: `url(./imgPlaceholder.svg)` }}
              ></div>
              <div className={styles.cardDetails}>
                <h3 className={styles.cardTitle}>{contest.title}</h3>
                <p className={styles.cardDescription}>{contest.description}</p>
                <button
                  className={styles.continueButton}
                  onClick={() => navigate("/manageContest/mainmenu")}
                >
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageContests;
