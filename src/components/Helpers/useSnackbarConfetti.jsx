import React, { useState } from "react";
import Confetti from "react-confetti";
import styles from "./YourComponent.module.css"; // Update with your actual CSS module file

export const useSnackbarConfetti = (config = {}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");
  const { backgroundColor = "linear-gradient(45deg, #6a3093, #a044ff)" } =
    config; // Destructure with default value

  const trigger = (text) => (event) => {
    event.preventDefault(); // Prevent default if it's being used as an event handler
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
      <div className={styles.snackBar} style={{ background: backgroundColor }}>
        {snackBarText}
        <div className={styles.loadingBar}></div>
      </div>
    );

  const ConfettiEffect = () =>
    showConfetti && <Confetti style={{ zIndex: "100000" }} />;
  return { trigger, SnackBar, ConfettiEffect };
};
