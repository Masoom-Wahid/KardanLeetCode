import React, { useState } from "react";
import styles from "./ChallengeCard.module.css"; // Your CSS module file path
import { ReactComponent as ChallengeIcon } from "./sit.svg"; // Path to your SVG icon

const ChallengeCard = ({
  id,
  title,
  points,
  timeLimit,
  description,
  onHoverDescription,
  isOdd,
}) => {
  const cardStyle = isOdd ? styles.cardOdd : styles.cardEven;

  const [showDescriptionBox, setShowDescriptionBox] = useState(false);

  const handleDescriptionClick = () => {
    setShowDescriptionBox(true);
    console.log("clicked");
  };

  const handleCloseClick = () => {
    setShowDescriptionBox(false);
  };

  return (
    <div className={`${styles.card} ${cardStyle}`}>
      <div className={styles.topSide}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <div className={styles.cardSubtitle}>
            <p className={styles.cardPoints}>Points: {points}</p>
            <p className={styles.cardTime}>Time Limit: {timeLimit}</p>
            <button
              className={styles.cardDescription}
              onClick={handleDescriptionClick}
            >
              DESCRIPTION
            </button>
            {showDescriptionBox && (
              <div
                className={`${styles.descriptionBox} ${
                  styles.showDescriptionBox ? styles.fadeIn : styles.fadeOut
                }`}
              >
                <div className={styles.descriptionContent}>
                  <h2 className={styles.descriptionTitle}>{title}</h2>
                  <div className={styles.descriptionText}>
                    <h4>Description</h4>
                    <p>{description}</p>
                  </div>
                  <button onClick={handleCloseClick}>Close</button>
                </div>
              </div>
            )}
            <ChallengeIcon className={styles.challengeIcon} />
          </div>
        </div>
      </div>
      <div className={styles.bottomSide}>
        <div className={styles.actionSection}>
          <span className={styles.continueText}>
            Continue With This Challenge
          </span>
          <button className={styles.solveButton}>Solve</button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
