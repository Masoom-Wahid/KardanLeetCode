import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Replace with your actual import path
import styles from "./CreateUserContestant.module.css"; // The CSS module for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const CreateUserContestant = () => {
  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibilityToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Replace with your form submit logic
  const handleSubmit = (event) => {
    event.preventDefault();
    // Form submit logic here
  };

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <img src="/logo.png" alt="Kardan University Logo" className="logo" />
        <h1 className={styles.title}>Welcome!</h1>
        <p className={styles.subtitle}>Enter the following</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
            <input
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <FontAwesomeIcon icon={faLock} className={styles.icon} />
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            <button
              type="button"
              onClick={handlePasswordVisibilityToggle}
              className={styles.passwordToggle}
            >
              <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
            </button>
          </div>
          <button type="submit" className={styles.registerButton}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserContestant;
