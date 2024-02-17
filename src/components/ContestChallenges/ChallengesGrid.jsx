import React,{useEffect,useState} from "react";
import ChallengeCard from "./ChallengeCard";
import styles from "./ChallengesGrid.module.css"; // Path to your CSS module
import NavBar from "../NavigationBar/NavBar"
import {useNavigate} from 'react-router-dom';
import Pagination from "../Pagination/Pagination";

const ChallengesGrid = () => {
  const [challengesData, setChallengesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [challengesPerPage] = useState(8); // Number of challenges per page
  const [contestName, setContestName] = useState("Contest");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}competition/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        
        // 423 means that the contest is finished
        if (response.status === 423) {
          localStorage.removeItem("accessToken")
          navigate("/home")
        }
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
        setChallengesData(data.data);
        setContestName(data.name);
        // Process the data
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastChallenge = currentPage * challengesPerPage;
  const indexOfFirstChallenge = indexOfLastChallenge - challengesPerPage;
  const currentChallenges = challengesData.slice(
    indexOfFirstChallenge,
    indexOfLastChallenge
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <NavBar />
      <div className={styles.gridContainer}>
        <h1 className={styles.title}>{contestName}</h1>
        <div className={styles.cardsGrid}>
          {challengesData &&
            currentChallenges.map((challenge, index) => (
              <ChallengeCard
                key={challenge.id}
                id={challenge.id}
                title={challenge.title}
                points={challenge.point}
                timeLimit={challenge.time_limit}
                solved={challenge.solved}
                lvl={challenge.lvl}
                isOdd={index % 2 === 0}
                description={challenge.description}
              />
            ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(challengesData.length / challengesPerPage)}
          onPageChange={paginate}
        />
      </div>
    </>
  );
};

export default ChallengesGrid;
