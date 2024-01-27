import React, { useState } from "react";
import Confetti from "react-confetti";
import styles from "./YourComponent.module.css"; // Update with your actual CSS module file

export const useSnackbarConfetti = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const trigger = () => {
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
        Give me a kiss baby, You solved the question! 🎉
        <div className={styles.loadingBar}></div>
      </div>
    );

  const ConfettiEffect = () => showConfetti && <Confetti />;

  return { trigger, SnackBar, ConfettiEffect };
};
