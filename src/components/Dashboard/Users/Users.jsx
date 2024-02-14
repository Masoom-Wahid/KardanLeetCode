import React, { useState } from "react";
import styles from "./Users.module.css"; // CSS Module for Users
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import SubmissionsList from "../ManageContests/Submissions/SubmissionsList";

const Users = () => {
  const navigate = useNavigate();
  // Placeholder data for user list
  const users = [
    { id: 1, name: "Alpha" },
    { id: 2, name: "Beta" },
    { id: 3, name: "Omega" },
    { id: 4, name: "Gamma" },
    { id: 5, name: "Alpha" },
    { id: 6, name: "Beta" },
    { id: 7, name: "Omegaa" },
    { id: 8, name: "Gamma" },
    { id: 9, name: "Alpha" },
    { id: 10, name: "Beta" },
    { id: 11, name: "Omega" },
    { id: 12, name: "Gamma" },
    { id: 13, name: "Alpha" },
    { id: 14, name: "Beta" },
    { id: 15, name: "Omega" },
    { id: 16, name: "Gamma" },
    { id: 17, name: "Alpha" },
    { id: 18, name: "Beta" },
    { id: 19, name: "Omega" },
    { id: 20, name: "Gamma" },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.usersContainer}>
          <h1 className={styles.title}>Users</h1>
          <button
            className={styles.addButton}
            onClick={() => navigate("/createContestant")}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add New
          </button>
          <SubmissionsList showLastSubmission={false} />
        </div>
      </div>
    </>
  );
};

export default Users;
