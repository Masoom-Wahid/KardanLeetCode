import React, { useEffect, useState } from "react";
import styles from "./Users.module.css"; // CSS Module for Users
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import SubmissionsList from "../ManageContests/Submissions/SubmissionsList";

const Users = ({contestData}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.usersContainer}>
          <h1 className={styles.title}>Users</h1>
          <button
            className={styles.addButton}
            onClick={() => navigate(`/createContestant/${contestData.id}`)}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add New
          </button>
          <SubmissionsList
            className={styles.submit}
            contestData={contestData}
            usersTab={true}
          />
        </div>
      </div>
    </>
  );
};

export default Users;
