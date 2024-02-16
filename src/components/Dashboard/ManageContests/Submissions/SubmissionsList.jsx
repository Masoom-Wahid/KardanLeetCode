import React, { useEffect, useState } from "react";
import styles from "./SubmissionsList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../../Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import SortableHeader from "../Sorting/SortableHeader";
import AliasOverlay from "../Overlay/AliasOverlay";

const SubmissionsList = ({ usersTab, contestData }) => {
  const [submissions, setSubmissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [maxAmountOfPage, setMaxAmountOfPage] = useState();
  const [submissionsPerPage] = useState(8);
  const indexOfLastSubmission = currentPage * submissionsPerPage;
  const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage;
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayIndex, setOverlayIndex] = useState(null);
  const navigate = useNavigate();

  const sortData = (key, direction) => {
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

  const currentSubmissions = submissions.slice(
    indexOfFirstSubmission,
    indexOfLastSubmission
  );

  const fetchData = async (page) => {
    let url = usersTab
      ? `${process.env.REACT_APP_API_URL}auth/users/getcredentials?contest=${contestData.name}&page=${page}`
      : `${process.env.REACT_APP_API_URL}contest/${contestData.id}?groups=True`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is
        // either bypassing
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("accessToken");
          navigate("/");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (usersTab) {
        setUsers(Object.entries(data.result));
        setMaxAmountOfPage(data.avaialable_pages);
      } else {
        setSubmissions(data);
      }
      // Process the data
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const handleAliasClick = (index) => {
    setOverlayIndex(index);
    setShowOverlay(true);
  };

  // AliasOverlay functions
  const handleOverlayClose = () => {
    setShowOverlay(false);
    setOverlayIndex(null);
  };

  const handleOverlaySubmit = (newUsername, newPassword) => {
    // Perform any actions needed with newUsername and newPassword
    // You can use overlayIndex to identify which alias button was clicked if needed.
  };

  const paginate = (pageNumber) => {
    fetchData(pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleView = (id) => {
    navigate(`/submissions/${id}`);
  };

  return (
    <div className={styles.containers}>
      <div className={styles.table}>
        {usersTab ? (
          <div className={styles.header}>
            <SortableHeader
              columnKey="teamName"
              onSort={sortData}
              sortConfig={sortConfig}
              className={styles.headerItem} // Pass the style class to SortableHeader
            >
              Username
            </SortableHeader>
            <SortableHeader
              columnKey="password"
              onSort={sortData}
              sortConfig={sortConfig}
              className={styles.headerItem} // Pass the style class to SortableHeader
            >
              <div className={styles.passwordItem}>Password</div>
            </SortableHeader>
            <div className={styles.headerItem}>Action</div>
          </div>
        ) : (
          <div className={styles.header}>
            <SortableHeader
              columnKey="id"
              onSort={sortData}
              sortConfig={sortConfig}
              className={styles.headerItem} // Pass the style class to SortableHeader
            >
              ID
            </SortableHeader>
            <SortableHeader
              columnKey="teamName"
              onSort={sortData}
              sortConfig={sortConfig}
              className={styles.headerItem} // Pass the style class to SortableHeader
            >
              Team Name
            </SortableHeader>
            <div className={styles.headerItem} style={{ cursor: "default" }}>
              Actions
            </div>
          </div>
        )}
        {usersTab
          ? users.map(([user, password], index) => (
              <div key={index} className={styles.row}>
                <div>{user}</div>
                <div className={styles.passwordItem}>{password}</div>
                <button
                  className={styles.aliasButton}
                  onClick={() => handleAliasClick(index)}
                >
                  Alias
                </button>
              </div>
            ))
          : currentSubmissions.map((submission) => (
              <div key={submission.id} className={styles.row}>
                <div>{submission.id}</div>
                <div>{submission.group_name}</div>
                <div>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleView(submission.id)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                    View All
                  </button>
                </div>
              </div>
            ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={
          usersTab
            ? maxAmountOfPage
            : Math.ceil(submissions.length / submissionsPerPage)
        }
        onPageChange={paginate}
      />
      {showOverlay && (
        <AliasOverlay
          onClose={handleOverlayClose}
          onSubmit={handleOverlaySubmit}
        />
      )}
    </div>
  );
};

export default SubmissionsList;
