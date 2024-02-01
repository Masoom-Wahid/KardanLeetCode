import React, { useState, sortConfig } from "react";
import styles from "./SubmissionsList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../Pagination/Pagination";
import { useNavigate } from "react-router-dom";

const initialSubmissions = [
  { id: 1, teamName: "Alpha", lastSubmission: "11:59:04" },
  { id: 2, teamName: "Beta", lastSubmission: "11:59:04" },
  { id: 3, teamName: "Omega", lastSubmission: "11:59:04" },
  { id: 4, teamName: "Gamma", lastSubmission: "11:59:04" },
  { id: 5, teamName: "Alpha", lastSubmission: "11:59:04" },
  { id: 6, teamName: "Beta", lastSubmission: "11:59:04" },
  { id: 7, teamName: "Omega", lastSubmission: "11:59:04" },
  { id: 8, teamName: "Gamma", lastSubmission: "11:59:04" },
  { id: 9, teamName: "Alpha", lastSubmission: "11:59:04" },
  { id: 10, teamName: "Beta", lastSubmission: "11:59:04" },
  { id: 11, teamName: "Omega", lastSubmission: "11:59:04" },
  { id: 12, teamName: "Gamma", lastSubmission: "11:59:04" },
  { id: 13, teamName: "Alpha", lastSubmission: "11:59:04" },
  { id: 14, teamName: "Beta", lastSubmission: "11:59:04" },
  { id: 15, teamName: "Omega", lastSubmission: "11:59:04" },
  { id: 16, teamName: "Gamma", lastSubmission: "11:59:04" },
  { id: 17, teamName: "Alpha", lastSubmission: "11:59:04" },
  { id: 18, teamName: "Beta", lastSubmission: "11:59:04" },
  { id: 19, teamName: "Omega", lastSubmission: "11:59:04" },
  { id: 20, teamName: "Gamma", lastSubmission: "11:59:04" },
];

const SubmissionsList = () => {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [submissionsPerPage] = useState(5);
  const navigate = useNavigate();

  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    const sortedData = [...submissions].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setSubmissions(sortedData);
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? faCaretDown : faCaretUp;
    }
    return faCaretDown;
  };

  const indexOfLastSubmission = currentPage * submissionsPerPage;
  const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage;
  const currentSubmissions = submissions.slice(
    indexOfFirstSubmission,
    indexOfLastSubmission
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleView = () => {
    navigate("/submissions");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Submissions</h1>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.headerItem} onClick={() => sortData("id")}>
            ID{" "}
            <FontAwesomeIcon
              icon={renderSortIcon("id")}
              className={styles.icon}
            />
          </div>
          <div
            className={styles.headerItem}
            onClick={() => sortData("teamName")}
          >
            Team Names{" "}
            <FontAwesomeIcon
              icon={renderSortIcon("teamName")}
              className={styles.icon}
            />
          </div>
          <div
            className={styles.headerItem}
            onClick={() => sortData("lastSubmission")}
          >
            Last Submission{" "}
            <FontAwesomeIcon
              icon={renderSortIcon("lastSubmission")}
              className={styles.icon}
            />
          </div>
          <div className={styles.headerItem} style={{ cursor: "default" }}>
            Action
          </div>
        </div>
        {currentSubmissions.map((submission) => (
          <div key={submission.id} className={styles.row}>
            <div>{submission.id}</div>
            <div>{submission.teamName}</div>
            <div>{submission.lastSubmission}</div>
            <div>
              <button className={styles.actionButton} onClick={handleView}>
                <FontAwesomeIcon icon={faEye} />
                View All
              </button>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(submissions.length / submissionsPerPage)}
        onPageChange={paginate}
      />
    </div>
  );
};

export default SubmissionsList;
