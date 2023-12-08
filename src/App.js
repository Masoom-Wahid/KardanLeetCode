import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import ContestChallenges from "./components/Challanges/Organism/ContestChallenges";
import ChallengeTableOrganism from "./components/Challanges/Organism/ChallengeTableOrganism";
import ChallengesListOrganism from "./components/ContestantChallanges/Organisms/ChallengesListOrganism";
import ChallengesPage from "./components/ContestantChallanges/Organisms/Challenges";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/challanges" element={<ContestChallenges />} />
          <Route path="/challanges-list" element={<ChallengesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
