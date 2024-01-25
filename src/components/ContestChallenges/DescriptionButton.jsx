// DescriptionButton.js
import React from "react";
import styles from "./ChallengeCard.module.css"; // Reuse the same CSS module for button

const DescriptionButton = ({ onShow }) => {
  return (
    <button className={styles.descriptionButton} onClick={onShow}>
      DESCRIPTION
    </button>
  );
};

export default DescriptionButton;
