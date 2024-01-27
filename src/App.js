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
import ManageContests from "./components/Dashboard/ManageContests";
import { Snackbar } from "@mui/material";
import ChallengesGrid from "./components/ContestChallenges/ChallengesGrid";
import ManageContestsParentComponent from "./components/Dashboard/ManageContestsParentComponent";
import ManageContest from "./components/Dashboard/ManageContest";
import CreateContestant from "./components/Dashboard/CreateContestant";
import PythonEditor from "./components/Editor/PythonEditor";

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
          <Route path="/contest" element={<ChallengesGrid />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/contest/:id" element={<EditorPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/home" element={<HomePage email={email} />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/createchallenge" element={<CreateChallenge />} />
          <Route path="/challenges/:id" element={<ParentComponent />} />
          <Route path="/createcontest" element={<CreateContest />} />
          <Route path="/contests" element={<ShowContest />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/createUserAdmin" element={<CreateUserAdmin />} />
          <Route
            path="/createUserContestant"
            element={<CreateUserContestant />}
          />
          <Route path="/users" element={<Users />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/managecontest" element={<ManageContests />} />
          <Route path="/analytics" element={<ManageContest />} />
          <Route
            path="/mainmanage"
            element={<ManageContestsParentComponent />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
