import React, { useState, useEffect } from "react";
import LeaderboardTableOrganism from "./LeaderboardTableOrganism";
import { mockWebSocket } from "../MockData/mockWebSocket";

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const stopMock = mockWebSocket((newData) => {
      setLeaderboardData(newData);
    });

    return () => stopMock();
  }, []);

  return <LeaderboardTableOrganism leaderboardData={leaderboardData} />;
};

export default LeaderboardPage;
