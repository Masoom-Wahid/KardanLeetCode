import React, { useState } from "react";
import styles from "./Users.module.css"; // CSS Module for Users
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users per page
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sort the displayed users
  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users]; // Clone the users array before sorting
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers.slice(indexOfFirstUser, indexOfLastUser); // Return the current page of users
  }, [users, sortConfig, currentPage, usersPerPage]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.usersContainer}>
          <h1 className={styles.title}>Users</h1>
          <button
            className={styles.addButton}
            onClick={() => navigate("/createUser")}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add New
          </button>
          <table className={styles.usersTable}>
            <thead>
              <tr>
                <th onClick={() => handleSort("id")}>
                  ID
                  {sortConfig.key === "id" ? (
                    <FontAwesomeIcon
                      id="sortIcon-id"
                      icon={
                        sortConfig.direction === "ascending"
                          ? faCaretDown
                          : faCaretUp
                      }
                      className={styles.icon}
                    />
                  ) : (
                    <FontAwesomeIcon
                      id="sortIcon-id"
                      icon={faCaretDown}
                      className={styles.icon}
                    />
                  )}
                </th>
                <th onClick={() => handleSort("name")}>
                  Team Names
                  {sortConfig.key === "name" ? (
                    <FontAwesomeIcon
                      id="sortIcon-name"
                      icon={
                        sortConfig.direction === "ascending"
                          ? faCaretDown
                          : faCaretUp
                      }
                      className={styles.icon}
                    />
                  ) : (
                    <FontAwesomeIcon
                      id="sortIcon-name"
                      icon={faCaretDown}
                      className={styles.icon}
                    />
                  )}
                </th>
                <th style={{ cursor: "default" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className={(styles.actionIcon, styles.editIcon)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className={(styles.actionIcon, styles.deleteIcon)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(users.length / usersPerPage)}
        onPageChange={paginate}
        className={styles.paginationContainer}
      />
    </>
  );
};

export default Users;
