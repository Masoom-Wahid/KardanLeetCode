import React, { useState } from "react";
import styles from "./ChallengeCard.module.css"; // Your CSS module file path
import { ReactComponent as ChallengeIcon } from "./sit.svg"; // Path to your SVG icon
import DescriptionButton from "./DescriptionButton";
import DescriptionModal from "./DescriptionModal";

const ChallengeCard = ({
  id,
  title,
  points,
  timeLimit,
  description,
  isOdd,
}) => {
  const cardStyle = isOdd ? styles.cardOdd : styles.cardEven;

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={`${styles.card} ${cardStyle}`}>
      <div className={styles.topSide}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <div className={styles.cardSubtitle}>
            <p className={styles.cardPoints}>Points: {points}</p>
            <p className={styles.cardTime}>Time Limit: {timeLimit}</p>
            <DescriptionButton
              onShow={handleShowModal}
              className={styles.descriptionButton}
            />
            {showModal && (
              <DescriptionModal
                title={title}
                description={description}
                onClose={handleCloseModal}
              />
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
