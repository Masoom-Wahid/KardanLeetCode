import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "./Sidebar"; // Replace with actual path
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faFilter,
  faSort,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Submissions.module.css";

// Mock data for submissions
const mockSubmissions = [
  {
    id: "1",
    teamName: "Alpha",
    challenge: "Landing Page",
    explanation: "Infinte Loop detected on the line 37:90",
    date: "Just now",
    status: "In Progress",
  },
  {
    id: "2",
    teamName: "Beta",
    challenge: "CRM Admin pages",
    explanation: "Infinte Loop detected on the line 37:90",
    date: "A minute ago",
    status: "Complete",
  },
  {
    id: "3",
    teamName: "Omega",
    challenge: "Client Project",
    explanation:
      "A land slide detected on the line 37:90 be careful not to fall in",
    date: "1 hour ago",
    status: "Pending",
  },
  {
    id: "4",
    teamName: "Gamma",
    challenge: "Admin Dashboard",
    explanation:
      "'The Fuck you dude you are nothing but a pest' detected on the line 69:69",
    date: "Yesterday",
    status: "Rejected",
  },
  // ... more submissions
];

// Pagination Component
const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={styles.pageItem}>
            <a
              onClick={() => paginate(number)}
              href={`#${currentPage}`}
              className={`${styles.pageLink} ${
                currentPage === number ? styles.active : ""
              }`}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Submissions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [submissionsPerPage] = useState(10); // Set how many submissions you want per page

  const [currentSubmissions, setCurrentSubmissions] = useState([]);

  // Function to update the list of submissions when the page changes
  const fetchSubmissions = useCallback(
    (pageNumber) => {
      const startIndex = (pageNumber - 1) * submissionsPerPage;
      const endIndex = startIndex + submissionsPerPage;
      setCurrentSubmissions(mockSubmissions.slice(startIndex, endIndex));
    },
    [submissionsPerPage]
  );

  // Pagination handler
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchSubmissions(pageNumber);
  };

  // Initial data fetch for the first page
  useEffect(() => {
    fetchSubmissions(currentPage);
  }, [currentPage, fetchSubmissions]);

  const handleFilter = (filterCriteria) => {
    console.log("Filtering by:", filterCriteria);
    // Implement filtering logic here
  };

  const handleSort = (sortOrder) => {
    console.log("Sorting by:", sortOrder);
    // Implement sorting logic here
  };

  return (
    <div className={`${styles.pageContainer} ${styles.fadeIn}`}>
      <Sidebar />
      <div className={styles.submissionsContainer}>
        <h1 className={styles.title}>Submissions</h1>
        <div className={styles.filterSortContainer}>
          <div
            className={styles.filterButton}
            onClick={() => handleFilter("criteria")}
          >
            <FontAwesomeIcon icon={faFilter} />
          </div>
          <div
            className={styles.sortButton}
            onClick={() => handleSort("order")}
          >
            <FontAwesomeIcon icon={faSort} />
          </div>
        </div>
        <table className={styles.submissionsTable}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>ID</th>
              <th className={styles.tableHeader}>Team Name</th>
              <th className={styles.tableHeader}>Challenge</th>
              <th className={(styles.tableHeader, styles.explanation)}>
                Explanation
              </th>
              <th className={styles.tableHeader}>Date</th>
              <th className={styles.tableHeader}>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentSubmissions.map((submission) => (
              <tr key={submission.id} className={styles.tableRow}>
                <td>{submission.id}</td>
                <td>{submission.teamName}</td>
                <td>{submission.challenge}</td>
                <td>{submission.explanation}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className={styles.dateIcon}
                  />{" "}
                  {submission.date}
                </td>
                <td className="status">
                  <span
                    className={
                      styles[
                        `${submission.status
                          .toLowerCase()
                          .replace(/\s/g, "")}Status`
                      ]
                    }
                  >
                    <FontAwesomeIcon
                      icon={faCircle}
                      className={styles.circleIcon}
                    />{" "}
                    {submission.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsPerPage={submissionsPerPage}
          totalItems={mockSubmissions.length}
          paginate={paginate}
          className={styles.pagination}
        />
      </div>
    </div>
  );
};

export default Submissions;
