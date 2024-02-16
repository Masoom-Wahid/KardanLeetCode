import React from "react";
import Reports from "../../Dashboard/ManageContests/Reports/Reports";
import "./LeaderboardPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faRedo } from "@fortawesome/free-solid-svg-icons";

const LeaderboardPage = ({ contestData }) => {
  return (
    <div className="leaderboard-page">
      <div variant="h4" className="leaderboard-title">
        Leaderboard
      </div>
      <div className="leaderboard-buttons">
        <button className="reload">
          <FontAwesomeIcon icon={faRedo} style={{ marginRight: "8px" }} />
          Reload
        </button>
        <button className="refresh">
          <FontAwesomeIcon icon={faSync} style={{ marginRight: "8px" }} />
          Refresh
        </button>
      </div>
      <Reports contestData={contestData} />
    </div>
  );
};

export default LeaderboardPage;
