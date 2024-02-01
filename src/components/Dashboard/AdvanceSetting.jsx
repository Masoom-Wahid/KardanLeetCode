import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faFlagCheckered,
  faBan,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./AdvanceSetting.module.css"; // The path to your module CSS file
import PurgeModal from "./PurgeModal";
import { useSnackbarConfetti } from "../Helpers/useSnackbarConfetti";

const AdvanceSetting = () => {
  const [isPurgeModalOpen, setPurgeModalOpen] = useState(false);
  const openPurgeModal = () => setPurgeModalOpen(true);
  const closePurgeModal = () => setPurgeModalOpen(false);
  const { trigger, SnackBar } = useSnackbarConfetti({
    backgroundColor: "#306AFF",
  });

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.column}>
          <button
            className={styles.button}
            onClick={trigger("Contest Started")}
          >
            <FontAwesomeIcon icon={faPlay} className={styles.icon} />
            Start Contest
          </button>

          <button
            className={styles.button}
            onClick={trigger("Contest has been ended manually")}
          >
            <FontAwesomeIcon icon={faFlagCheckered} className={styles.icon} />
            End Contest
          </button>

          <button className={styles.button} onClick={openPurgeModal}>
            <FontAwesomeIcon icon={faBan} className={styles.icon} />
            Purge Contest
          </button>
        </div>

        <div className={styles.column}>
          <button
            className={styles.button}
            onClick={trigger("Contest Starred")}
          >
            <FontAwesomeIcon icon={faStar} className={styles.icon} />
            Star Contest
          </button>

          <button
            className={styles.button}
            onClick={trigger("Contest UnStarred")}
          >
            <FontAwesomeIcon icon={faStarHalfAlt} className={styles.icon} />
            UnStar Contest
          </button>
        </div>
        <PurgeModal isOpen={isPurgeModalOpen} onClose={closePurgeModal} />
        <SnackBar />
      </div>
    </>
  );
};

export default AdvanceSetting;
