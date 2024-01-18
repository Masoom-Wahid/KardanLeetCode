import React from "react";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import styles from "./CreateUser.module.css"; // The CSS module for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();

  const handleAdminUserClick = () => {
    navigate("/createUserAdmin");
  };

  const handleContestantUserClick = () => {
    navigate("/createUserContestant");
  };

  return (
    <div className={styles.createUserContainer}>
      <Sidebar />
      <div className={styles.createUserContent}>
        <h1 className={styles.title}>Create User</h1>
        <p className={styles.subtitle}>
          Select the type of user you want to create
        </p>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.userButton} ${styles.adminButton}`}
            onClick={handleAdminUserClick}
          >
            <FontAwesomeIcon icon={faUserPlus} />
            <span> Admin</span>
          </button>
          <button
            className={`${styles.userButton} ${styles.contestantButton}`}
            onClick={handleContestantUserClick}
          >
            <FontAwesomeIcon icon={faUserPlus} />
            <span> Contestant</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
