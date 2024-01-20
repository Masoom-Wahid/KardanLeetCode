import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/LoginPage/Login";
import ContestChallenges from "./components/Challanges/Organism/ContestChallenges";
import ChallengesPage from "./components/ContestantChallanges/Organisms/Challenges";
import LeaderboardPage from "./components/LeaderBoard/Organisms/LeaderboardPage";
import EditorPage from "./components/ChallengeSolve/Organisms/EditorPage";
import HomePage from "./components/Home/HomePage";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateChallenge from "./components/Dashboard/CreateChallenge";
import ParentComponent from "./components/Dashboard/ParentComponent";
import CreateContest from "./components/Dashboard/CreateContest";
import ShowContest from "./components/Dashboard/ShowContest";
import CreateUser from "./components/Dashboard/CreateUser";
import CreateUserAdmin from "./components/Dashboard/CreateUserAdmin";
import CreateUserContestant from "./components/Dashboard/CreateUserContestant";
import Users from "./components/Dashboard/Users";
import Submissions from "./components/Dashboard/Submissions";

function App() {
  const [email, setEmail] = useState("");
  useEffect(() => {
    document.title = "KPC";
  }, []);

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
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/createchallenge" element={<CreateChallenge />} />
          <Route path="/challengedetails" element={<ParentComponent />} />
          <Route path="/createcontest" element={<CreateContest />} />
          <Route path="/showcontest" element={<ShowContest />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/createUserAdmin" element={<CreateUserAdmin />} />
          <Route
            path="/createUserContestant"
            element={<CreateUserContestant />}
          />
          <Route path="/users" element={<Users />} />
          <Route path="/submissions" element={<Submissions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
