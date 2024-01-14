import { React, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// import Login from "./components/Login/Login";
import Login from "./components/LoginPage/Login";
import ContestChallenges from "./components/Challanges/Organism/ContestChallenges";
import ChallengeTableOrganism from "./components/Challanges/Organism/ChallengeTableOrganism";
import ChallengesListOrganism from "./components/ContestantChallanges/Organisms/ChallengesListOrganism";
import ChallengesPage from "./components/ContestantChallanges/Organisms/Challenges";
import LeaderboardPage from "./components/LeaderBoard/Organisms/LeaderboardPage";
import EditorPage from "./components/ChallengeSolve/Organisms/EditorPage";
import UserRows from "./components/LeaderboardUI/Organisms/UserRows";
// import LeaderboardPage from "./components/LeaderboardUI/Pages/LeaderboardPage";
import LeaderboardTable from "./components/LeaderboardUI/Organisms/LeaderboardTable";
import HomePage from "./components/Home/HomePage";


function App() {
  const [email, setEmail] = useState("");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setEmail={setEmail} />} />
          <Route path="/challenges" element={<ContestChallenges />} />
          <Route path="/challenges-list" element={<ChallengesPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/home" element={<HomePage email={email} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
