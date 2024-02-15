import React from "react";
import Reports from "../../Dashboard/ManageContests/Reports/Reports";
import "./LeaderboardTableOrganism.scss";

const LeaderboardPage = ({contestData}) => {
  return (
    <>
      <div variant="h4" className="leaderboard-title">
        Leaderboard
      </div>
      <Reports contestData={contestData} />
    </>
  );
};

export default LeaderboardPage;
