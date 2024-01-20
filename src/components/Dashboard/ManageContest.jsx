import React from "react";
import Sidebar from "./Sidebar"; // Replace with your actual path
import styles from "./ManageContest.module.css"; // Your CSS module for this component
import NivoBar from "./NivoBar";
import NivoLine from "./NivoLine";

const ManageContest = () => {
  // Mock data for the cards
  const cardsData = [
    { title: "Correct Answers", value: "721K" },
    { title: "Incorrect Answers", value: "367K" },
    { title: "Number of Challenges", value: "1,156" },
    { title: "Active Contestants", value: "239K" },
  ];

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <h1 className={styles.title}>Kardan Contest</h1>
        <div className={styles.cardsContainer}>
          {cardsData.map((card, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardTitle}>{card.title}</div>
              <div className={styles.cardValue}>{card.value}</div>
            </div>
          ))}
        </div>
        <div className={styles.chartsContainer}>
          <NivoLine type="line" className={styles.chart} />
          <NivoBar type="bar" className={styles.chart} />
        </div>
      </div>
    </div>
  );
};

export default ManageContest;
