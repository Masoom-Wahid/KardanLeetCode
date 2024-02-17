import React from "react";
import { useLocation } from 'react-router-dom';
import ChallengeTableOrganism from "./ChallengeTableOrganism";
import "./ContestChallengess.css";
import Sidebar from "../../Dashboard/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const ContestChallenges = () => {

  const navigate = useNavigate();
  return (
    <div className="page-container">
      <div className="contest-challenges">
        <h2 className="title">Kardan University's Programming Web App</h2>
        <p className="description">
          Add challenges to your contest by selecting challenges from our
          library or create and add your own challenges here. To reorder your
          challenges, simply select the challenge and then drag and drop to the
          desired location.
        </p>
        <div className="challenge-table-container">
          <ChallengeTableOrganism />
        </div>
        <button
          onClick={() => navigate("/createchallenge")}
          className="add-button"
        >
          Add Challenge
        </button>
      </div>
    </div>
  );
};

export default ContestChallenges;
