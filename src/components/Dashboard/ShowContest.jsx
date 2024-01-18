import React, { useState,useEffect } from "react";
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
  const [contests, setContests] = useState([]);
  const [selectedContests, setSelectedContests] = useState(new Set());


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}contest/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          // 401 means unauthorized , so the user is either using an old token or is
          // either bypassing
          if (response.status === 401) {
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setContests(data);
        // Process the data
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };

    fetchData();
  }, []);




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

  const handleDeleteSelected = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}contest/${id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!response.ok) {
        // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is 
        // either bypassing 
        if (response.status === 401 || response.status === 403){
          localStorage.removeItem("accessToken")
          navigate("/")
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Filter The Deleted Contest
      setContests((prevContest) =>
      prevContest.filter((challenge) => challenge.id !== id)
      );
      // Process the data
    } catch (error) {
      // Handle errors
      console.error(error);
    }
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
              <th>Duration</th>
              <th>Starred</th>
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
                <td>{contest.duration}</td>
                <td>{ contest.starred ? "True" : "False"}</td>
                <td>
                  <div className={styles.actionIcons}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className={styles.editIcon}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className={styles.deleteIcon}
                      onClick={() => handleDeleteSelected(contest.id)}
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
            onClick={() => console.log("HEYYYYYYYYYYY")}
          />
        </div>
      </div>
    </div>
  );
};

export default ShowContest;
