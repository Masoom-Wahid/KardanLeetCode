import React, { useState } from "react";
import styles from "./Users.module.css"; // CSS Module for Users
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";

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

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                <th>ID</th>
                <th>Team Names</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className={styles.actionIcon}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className={styles.actionIcon}
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
      />
    </>
  );
};

export default Users;
