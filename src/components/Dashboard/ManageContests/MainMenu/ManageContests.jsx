import React,{useState,useEffect} from "react";
import Sidebar from "../../Sidebar/Sidebar";
import styles from "./ManageContests.module.css"; // Make sure to create a CSS module file for this
import { useNavigate } from "react-router-dom";

const ManageContests = () => {
  const navigate = useNavigate();
  const [contestData,setContestData] = useState([]);

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
          // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is
          // either bypassing
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setContestData(data);
        // Process the data
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };
    fetchData();
  },[]);
  return (
    <div className={styles.manageContests}>
      <Sidebar />
      <div className={styles.content}>
      {
        contestData && (
          <>
            <div className={styles.titles}>
            <h1 className={styles.title}>Manage Contests</h1>
            <h2 className={styles.subtitle}>Select a contest</h2>
          </div>
          <div className={styles.cardsContainer}>
            {contestData.map((contest) => (
              <div key={contest.id} className={styles.card}>
                <div
                  className={styles.imagePlaceholder}
                  // if you want to get the image from the api, do it like this
                  // style={{ backgroundImage: `url(${contest.imageUrl})` }}
                  style={{ backgroundImage: `url(./imgPlaceholder.svg)` }}
                ></div>
                <div className={styles.cardDetails}>
                  <h3 className={styles.cardTitle}>{contest.name}</h3>
                  <p className={styles.cardDescription}>{`
                  Starred : ${contest.starred}
                  `}</p>
                  <p className={styles.cardDescription} >{`Contest Duration: ${contest.duration}`}</p>
                  <button
                    className={styles.continueButton}
                    onClick={() => navigate(`/contests/${contest.id}`)}
                  >
                    Continue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
          )
      }

      </div>
    </div>
  );
};

export default ManageContests;
