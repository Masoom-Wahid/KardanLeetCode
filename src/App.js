import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import ContestChallenges from "./components/Challanges/Organism/ContestChallenges";
import ChallengeTableOrganism from "./components/Challanges/Organism/ChallengeTableOrganism";
import ChallengesListOrganism from "./components/ContestantChallanges/Organisms/ChallengesListOrganism";
import ChallengesPage from "./components/ContestantChallanges/Organisms/Challenges";
import LeaderboardPage from "./components/LeaderBoard/Organisms/LeaderboardPage";
import EditorPage from "./components/ChallengeSolve/Organisms/EditorPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/challenges" element={<ContestChallenges />} />
          <Route path="/challenges-list" element={<ChallengesPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
