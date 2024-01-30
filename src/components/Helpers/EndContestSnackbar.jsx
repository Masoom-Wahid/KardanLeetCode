import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./EndContestSnackbar.module.css"; // Update the path to your CSS module

const ProgressBar = ({ duration, show, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (show) {
      const intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + (100 * 50) / duration;
          if (newProgress >= 160) {
            clearInterval(intervalId);
            onLoadingComplete(); // Notify that loading is complete
            return 160;
          }
          return newProgress;
        });
      }, 50);

      return () => clearInterval(intervalId);
    }
  }, [show, duration, onLoadingComplete]);

  return (
    <div className={styles.loadingBar} style={{ width: `${progress}%` }}></div>
  );
};

export const EndContestSnackbar = (
  duration = 5000,
  snackbarSize = { width: 400, height: 200 }
) => {
  const [show, setShow] = useState(false);
  const [isConfetti, setIsConfetti] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const trigger = () => {
    setShow(true);
    setIsConfetti(false);
  };

  const onLoadingComplete = () => {
    setIsConfetti(true);
    setShowConfetti(true);
  };

  const handleClose = () => {
    setShow(false);
    setIsConfetti(false);
    setShowConfetti(false);
  };

  const SnackbarContent = () => {
    if (isConfetti) {
      return (
        <>
          <div className={styles.magicText}>
            The contest is over! Celebrate! 🎉
          </div>
          <FontAwesomeIcon
            icon={faTimes}
            className={styles.closeIcon}
            onClick={handleClose}
          />
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </>
      );
    }
    return (
      <>
        <div className={styles.magicText}>
          Only a few seconds till the end... 🌟
        </div>
        <div className={styles.loadingBarWrapper}>
          <ProgressBar
            duration={duration}
            show={show}
            onLoadingComplete={onLoadingComplete}
          />
        </div>
      </>
    );
  };

  const Snackbar = () =>
    show && (
      <div
        className={styles.snackbar}
        style={{ width: snackbarSize.width, height: snackbarSize.height }}
      >
        <SnackbarContent />
      </div>
    );
  const ConfettiEffect = () =>
    showConfetti && <Confetti style={{ zIndex: "100000" }} />;

  return { trigger, Snackbar, ConfettiEffect };
};
