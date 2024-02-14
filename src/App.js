import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/LoginPage/Login";
import ContestChallenges from "./components/Challanges/Organism/ContestChallenges";
import LeaderboardPage from "./components/LeaderBoard/Organisms/LeaderboardPage";
import EditorPage from "./components/ChallengeSolve/Organisms/EditorPage";
import HomePage from "./components/Home/HomePage";
import Dashboard from "./components/Dashboard/Admin/Dashboard";
import CreateChallenge from "./components/Dashboard/Challenges/CreateChallenge";
import ParentComponent from "./components/Dashboard/Challenges/ParentComponent";
import CreateContest from "./components/Dashboard/Contest/CreateContest";
import ShowContest from "./components/Dashboard/ManageContests/Contest/ShowContest";
import CreateUser from "./components/Dashboard/Users/CreateUser";
import CreateUserContestant from "./components/Dashboard/Users/CreateUserContestant";
import Users from "./components/Dashboard/Users/Users";
import Submissions from "./components/Dashboard/ManageContests/Submissions/Submissions";
import ManageContests from "./components/Dashboard/ManageContests/MainMenu/ManageContests";
import ChallengesGrid from "./components/ContestChallenges/ChallengesGrid";
import ManageContestsParentComponent from "./components/Dashboard/ManageContests/TabComponent/ManageContestsParentComponent";
import ManageContest from "./components/Dashboard/ManageContests/Analytics/ManageContest";
import ProtectedRoute from "./ProtectedRoute";
import SubmissionDetail from "./components/SubmissionDetail/SubmissionDetail";
import CreateContestant from "./components/Dashboard/Contest/CreateContestant";
import Layout from "./components/Dashboard/Layout/Layout";
import AboutUs from "./components/Developers/AboutUs";
import ServicesSection from "./components/Developers/Services";
import TabChangeCounter from "./components/TabChangeComponent/TabChangeComponent";
import Reports from "./components/Dashboard/ManageContests/Reports/Reports";
import AdminSignUp from "./components/Dashboard/Admin/AdminSignUp";

const OriginalResizeObserver = window.ResizeObserver;

// Create a new ResizeObserver constructor
window.ResizeObserver = function (callback) {
  const wrappedCallback = (entries, observer) => {
    window.requestAnimationFrame(() => {
      callback(entries, observer);
    });
  };

  // Create an instance of the original ResizeObserver
  // with the wrapped callback
  return new OriginalResizeObserver(wrappedCallback);
};

// Copy over static methods, if any
for (let staticMethod in OriginalResizeObserver) {
  if (OriginalResizeObserver.hasOwnProperty(staticMethod)) {
    window.ResizeObserver[staticMethod] = OriginalResizeObserver[staticMethod];
  }
}

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
        <TabChangeCounter />
        <Routes>
          <Route path="/" element={<Login setEmail={setEmail} />} />

          <Route path="/contest" element={<ChallengesGrid />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/contest/:id" element={<EditorPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/home" element={<HomePage email={email} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/report" element={<Reports />} />
          <Route path="/submissions/:id" element={<SubmissionDetail />} />
          <Route path="/manage" element={<ManageContest />} />
          <Route path="/adminSignUp" element={<AdminSignUp />} />
          <Route
            path="/admin"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/createchallenge"
            element={
              <Layout>
                <CreateChallenge />
              </Layout>
            }
          />
          <Route
            path="/challenges/:id"
            element={
              <Layout>
                <ParentComponent />
              </Layout>
            }
          />
          <Route
            path="/createcontest"
            element={
              <Layout>
                <CreateContest />
              </Layout>
            }
          />
          <Route
            path="/challenges"
            element={
              <Layout>
                <ProtectedRoute
                  component={ContestChallenges}
                  isAuthenticated={isAuthenticated}
                />
              </Layout>
            }
          />
          <Route
            path="/createUser"
            element={
              <Layout>
                <CreateUser />
              </Layout>
            }
          />
          <Route
            path="/users"
            element={
              <Layout>
                <Users />
              </Layout>
            }
          />
          <Route
            path="/submissions"
            element={
              <Layout>
                <Submissions />
              </Layout>
            }
          />
          <Route
            path="/contests"
            element={
              <Layout>
                <ManageContests />
              </Layout>
            }
          />
          <Route
            path="/analytics"
            element={
              <Layout>
                <ManageContest />
              </Layout>
            }
          />
          <Route
            path="/createContestant"
            element={
              <Layout>
                <CreateContestant />
              </Layout>
            }
          />
          <Route
            path="/contests/:id"
            element={
              <Layout>
                <ManageContestsParentComponent />
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
