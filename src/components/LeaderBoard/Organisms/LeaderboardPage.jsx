import React from "react";
import Reports from "../../Dashboard/ManageContests/Reports/Reports";
import "./LeaderboardTableOrganism.scss";

const LeaderboardPage = () => {
  return (
    <>
      <div variant="h4" className="leaderboard-title">
        Leaderboard
      </div>
      <Reports />
    </>
  );
};

export default LeaderboardPage;
