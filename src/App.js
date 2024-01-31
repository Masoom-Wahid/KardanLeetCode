import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/LoginPage/Login";
import ContestChallenges from "./components/Challanges/Organism/ContestChallenges";
import LeaderboardPage from "./components/LeaderBoard/Organisms/LeaderboardPage";
import EditorPage from "./components/ChallengeSolve/Organisms/EditorPage";
import HomePage from "./components/Home/HomePage";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateChallenge from "./components/Dashboard/CreateChallenge";
import ParentComponent from "./components/Dashboard/ParentComponent";
import CreateContest from "./components/Dashboard/CreateContest";
import ShowContest from "./components/Dashboard/ShowContest";
import CreateUser from "./components/Dashboard/CreateUser";
import CreateUserContestant from "./components/Dashboard/CreateUserContestant";
import Users from "./components/Dashboard/Users";
import Submissions from "./components/Dashboard/Submissions";
import ManageContests from "./components/Dashboard/ManageContests";
import ChallengesGrid from "./components/ContestChallenges/ChallengesGrid";
import ManageContestsParentComponent from "./components/Dashboard/ManageContestsParentComponent";
import ManageContest from "./components/Dashboard/ManageContest";
import ProtectedRoute from "./ProtectedRoute";
import SubmissionDetail from "./components/SubmissionDetail/SubmissionDetail";
import CreateContestant from "./components/Dashboard/CreateContestant";

function App() {
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthState = () => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    document.title = "KPC";
    checkAuthState();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setEmail={setEmail} />} />
          <Route
            path="/challenges"
            element={
              <ProtectedRoute
                component={ContestChallenges}
                isAuthenticated={isAuthenticated}
              />
            }
          />
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
          <Route
            path="/createUserContestant"
            element={<CreateUserContestant />}
          />
          <Route path="/users" element={<Users />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/managecontest" element={<ManageContests />} />
          <Route path="/analytics" element={<ManageContest />} />
          <Route path="/submissiondetail" element={<SubmissionDetail />} />
          <Route path="/createContestant" element={<CreateContestant />} />
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
