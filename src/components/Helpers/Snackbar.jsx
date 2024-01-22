import React, { useState, useEffect, useRef } from "react";
import styles from "./Snackbar.module.css";

const Snackbar = ({ button, text }) => {
  const [isVisible, setIsVisible] = useState(false);
  const notificationRef = useRef(null);

  const toggleNotification = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {React.cloneElement(button, { onClick: toggleNotification })}
      <figure
        ref={notificationRef}
        className={`${styles.notification} ${!isVisible ? styles.hide : ""}`}
      >
        <div className={styles.notificationBody}>
          <div className={styles.notificationBodyFirst}>
            <svg focusable="false" viewBox="0 0 24 24">
              <path
                d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,
                                 8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 
                                 4.31L15.77,2.74C14.61,2.26 13.34,2 
                                 12,2A10,10 0 0,0 2,12A10,10 0 0,0 
                                 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,
                                 16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
              ></path>
            </svg>
            <p>{text}</p>
          </div>
          <svg
            onClick={toggleNotification}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M18 6l-12 12"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </div>
      </figure>
    </>
  );
};

export default Snackbar;
