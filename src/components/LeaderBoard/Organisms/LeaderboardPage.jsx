import React, { useState, useEffect } from "react";
import LeaderboardTableOrganism from "./LeaderboardTableOrganism";
import { mockWebSocket } from "../MockData/mockWebSocket";
import Navbar from "../../NavBar/Navbar";

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const stopMock = mockWebSocket((newData) => {
      setLeaderboardData(newData);
    });

    return () => stopMock();
  }, []);

  return (
    <>
      <Navbar />
      <LeaderboardTableOrganism leaderboardData={leaderboardData} />
    </>
  );
};

export default LeaderboardPage;
