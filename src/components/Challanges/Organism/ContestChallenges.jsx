import React from "react";
import ChallengeTableOrganism from "./ChallengeTableOrganism";
import "./ContestChallengess.scss";
import Sidebar from "../../Dashboard/Sidebar";
import { useNavigate } from "react-router-dom";

const ContestChallenges = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <Sidebar />
      <div className="contest-challenges">
        <h2 className="title">Kardan University's Programming Contest</h2>
        <p className="description">
          Add challenges to your contest by selecting challenges from our
          library or create and add your own challenges here. To reorder your
          challenges, simply select the challenge and then drag and drop to the
          desired location.
        </p>
        <div className="challenge-table-container">
          <ChallengeTableOrganism />
        </div>
        <button onClick={() => navigate("/createchallenge")}>
          Add Challenge
        </button>
      </div>
    </div>
  );
};

export default ContestChallenges;
