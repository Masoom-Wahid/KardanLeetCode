import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrashAlt,
  faCheckSquare,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar"; // Replace with your actual import path
import styles from "./ShowContest.module.css"; // CSS Module
import { useNavigate } from "react-router-dom";

const ShowContest = () => {
  const navigate = useNavigate();
  const [contests, setContests] = useState([
    {
      id: "c1",
      name: "Kardan Contest",
      date: "12 Dec, 2021",
      time: "10:15 AM",
    },
    {
      id: "c2",
      name: "Fall 2024 Contest",
      date: "10 Dec, 2021",
      time: "11:20 AM",
    },
    {
      id: "c3",
      name: "Something Contest",
      date: "09 Dec, 2021",
      time: "11:45 AM",
    },
    {
      id: "c4",
      name: "Other Thing Contest",
      date: "08 Dec, 2021",
      time: "12:15 PM",
    },
  ]);

  const [selectedContests, setSelectedContests] = useState(new Set());

  const handleSelectContest = (contestId) => {
    setSelectedContests((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(contestId)) {
        newSelected.delete(contestId);
      } else {
        newSelected.add(contestId);
      }
      return newSelected;
    });
  };

  const handleAddNewClick = () => {
    navigate("/createcontest");
  };

  const handleDeleteSelected = () => {
    // ...whoever you are, please handle the delete button here!
  };

  // ...other handlers like edit and delete

  return (
    <div className={styles.showContestContainer}>
      <Sidebar />
      <div className={styles.contestsContainer}>
        <h1 className={styles.title}>Contests</h1>
        <button className={styles.addButton} onClick={handleAddNewClick}>
          <FontAwesomeIcon icon={faPlus} />
          Add New
        </button>
        <table className={styles.contestsTable}>
          <thead>
            <tr>
              <th>Check Box</th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr
                key={contest.id}
                className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td>
                  <FontAwesomeIcon
                    icon={
                      selectedContests.has(contest.id)
                        ? faCheckSquare
                        : faSquare
                    }
                    className={styles.checkboxIcon}
                    onClick={() => handleSelectContest(contest.id)}
                  />
                </td>
                <td>{contest.name}</td>
                <td>{contest.date}</td>
                <td>{contest.time}</td>
                <td>
                  <div className={styles.actionIcons}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className={styles.editIcon}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className={styles.deleteIcon}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.bulkAction}>
          <hr className={styles.divider} />
        </div>
        <div className="deleteMultipleFrame">
          <FontAwesomeIcon
            icon={faTrashAlt}
            className={styles.bulkDeleteIcon}
            onClick={handleDeleteSelected}
          />
        </div>
      </div>
    </div>
  );
};

export default ShowContest;
