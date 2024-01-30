import React, { useState } from "react";
import Confetti from "react-confetti";
import styles from "./YourComponent.module.css"; // Update with your actual CSS module file

export const useSnackbarConfetti = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");

  const trigger = (text) => {
    setSnackBarText(text); // Set the dynamic text for snackbar
    setShowConfetti(true);
    setShowSnackBar(true);
    setTimeout(() => {
      setShowSnackBar(false);
      setShowConfetti(false);
    }, 3000);
  };

  const SnackBar = () =>
    showSnackBar && (
      <div className={styles.snackBar}>
        {snackBarText}
        <div className={styles.loadingBar}></div>
      </div>
    );

  const ConfettiEffect = () =>
    showConfetti && <Confetti style={{ zIndex: "100000" }} />;
  return { trigger, SnackBar, ConfettiEffect };
};
