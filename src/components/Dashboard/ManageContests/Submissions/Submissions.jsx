import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faFilter,
  faSort,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Submissions.module.css";
import Pagination from "../../../Pagination/Pagination";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Mock data for submissions
const mockSubmissions = [
  {
    no: "1",
    submissionId: "p1d41g3a23g21",
    challenge: "Landing Page",
    explanation: "Infinte Loop detected on the line 37:90",
    date: "Just now",
    status: "In Progress",
  },
  {
    no: "2",
    submissionId: "p1ds3g3a27655f",
    challenge: "CRM Admin pages",
    explanation: "Infinte Loop detected on the line 37:90",
    date: "A minute ago",
    status: "Complete",
  },
  {
    no: "3",
    submissionId: "p1dds7k3a2762f",
    challenge: "Client Project",
    explanation:
      "A land slide detected on the line 37:90 be careful not to fall in",
    date: "1 hour ago",
    status: "Pending",
  },
  {
    no: "4",
    submissionId: "k134b231kbnjds7",
    challenge: "Admin Dashboard",
    explanation:
      "'The Fuck you dude you are nothing but a pest' detected on the line 69:69",
    date: "Yesterday",
    status: "Rejected",
  },
  {
    no: "5",
    submissionId: "p1d41g3a23g21",
    challenge: "Landing Page",
    explanation: "Infinte Loop detected on the line 37:90",
    date: "Just now",
    status: "In Progress",
  },
  {
    no: "6",
    submissionId: "p1ds3g3a27655f",
    challenge: "CRM Admin pages",
    explanation: "Infinte Loop detected on the line 37:90",
    date: "A minute ago",
    status: "Complete",
  },
  {
    no: "7",
    submissionId: "p1dds7k3a2762f",
    challenge: "Client Project",
    explanation:
      "A land slide detected on the line 37:90 be careful not to fall in",
    date: "1 hour ago",
    status: "Pending",
  },
  {
    no: "8",
    submissionId: "k134b231kbnjds7",
    challenge: "Admin Dashboard",
    explanation:
      "'The Fuck you dude you are nothing but a pest' detected on the line 69:69",
    date: "Yesterday",
    status: "Rejected",
  },
  {
    no: "9",
    submissionId: "p1d41g3a23g21",
    challenge: "Landing Page",
    explanation: "Infinte Loop detected on the line 37:90",
    date: "Just now",
    status: "In Progress",
  },
  {
    no: "10",
    submissionId: "p1ds3g3a27655f",
    challenge: "CRM Admin pages",
    explanation: "Infinte Loop detected on the line 37:90",
    date: "A minute ago",
    status: "Complete",
  },
  {
    no: "11",
    submissionId: "p1dds7k3a2762f",
    challenge: "Client Project",
    explanation:
      "A land slide detected on the line 37:90 be careful not to fall in",
    date: "1 hour ago",
    status: "Pending",
  },
  {
    no: "12",
    submissionId: "k134b231kbnjds7",
    challenge: "Admin Dashboard",
    explanation:
      "'The Fuck you dude you are nothing but a pest' detected on the line 69:69",
    date: "Yesterday",
    status: "Rejected",
  },
  {
    no: "13",
    submissionId: "p1d41g3a23g21",
    challenge: "Landing Page",
    explanation: "Infinte Loop detected on the line 37:90",
    date: "Just now",
    status: "In Progress",
  },
  {
    no: "14",
    submissionId: "p1ds3g3a27655f",
    challenge: "CRM Admin pages",
    explanation: "Infinte Loop detected on the line 37:90",
    date: "A minute ago",
    status: "Complete",
  },

  // ... more submissions
];

const Submissions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [submissionsPerPage] = useState(6); // Set how many submissions you want per page
  const [currentSubmissions, setCurrentSubmissions] = useState([]);
  const [teamName,setTeamName] = useState()
  const [totalPages,setTotalPages] = useState()
  const navigate = useNavigate();
  const { id } = useParams();
  if (id === undefined){
    if(!isNaN(id)) navigate("/admin")
    
  } 

  // Function to update the list of submissions when the page changes
  const fetchSubmissions = useCallback(
    (pageNumber) => {
      const startIndex = (pageNumber - 1) * submissionsPerPage;
      const endIndex = startIndex + submissionsPerPage;
      setCurrentSubmissions(mockSubmissions.slice(startIndex, endIndex));
    },
    [submissionsPerPage]
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData(pageNumber)
  };


  const fetchData = async (page) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}contest/groups?id=${id}&page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

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
      setTeamName(data.team_name)
      setCurrentSubmissions(data.data)
    
      setTotalPages(data.avaialabe_pages)
      // Process the data
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  }
  // Initial data fetch for the first page
  useEffect(() => {
    fetchData(1)
  }, []);

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
      <div className={styles.submissionsContainer}>
        <h1 className={styles.title}>Submissions</h1>
        <h1 className={styles.teamName}>{teamName}</h1>
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
              <th className={styles.tableHeader}>Submission ID</th>
              <th className={styles.tableHeader}>Challenge</th>
              <th className={styles.tableHeader}>Language</th>
              <th className={styles.tableHeader}>Accepted</th>
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
                <td style={{cursor:"pointer"}} onClick={() => navigate(`/submission/${submission.id}`)}>{submission.id}</td>
                <td>{submission.question}</td>
                <td>{submission.lang}</td>
                <td>{submission.solved ? "True" : "False"}</td>
                <td>{submission.status}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className={styles.dateIcon}
                  />{" "}
                  {submission.submit_time}
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
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
        />
      </div>
    </div>
  );
};

export default Submissions;
