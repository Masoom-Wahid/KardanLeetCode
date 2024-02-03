import React from "react";
import LeaderboardTableOrganism from "./LeaderboardTableOrganism";

const LeaderboardPage = ({contestData}) => {
  return (
    <>
      <LeaderboardTableOrganism contestData={contestData} />
    </>
  );
};

export default LeaderboardPage;
