import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTasks,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Contestants", number: 1000, change: "1.2%", term: "This Term" },
];

const StatsCard = ({ label, number, change, term }) => (
  <div className="stats-card">
    <div className="colum-align">
      <FontAwesomeIcon icon={faUserCircle} />
      <div className="stats-label">{label}</div>
      <div className="stats-number">{number}</div>
    </div>
    <div className="stats-term">
      <div className="stats-change stats-change-number">{change}</div>
      <div className="stats-change">{term}</div>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <main className="main-content">
        <div className="admin-title">
          <h1>Admin Panel</h1>
        </div>
        <div className="welcome-card">
          <div className="welcome-content">
            <h1 className="welcome-title">
              Welcome to the Kardan University Contest Web App.
            </h1>
            <p className="welcome-description">
              As a website administrator, your role involves organizing a
              balanced contest for students to showcase their programming
              skills, positively influencing the university's academic standing.
              Crafting an engaging event reflects the institution's commitment
              to excellence and talent development in programming education.
              Your efforts contribute significantly to the university's
              reputation for continual improvement.
            </p>
          </div>
          <div className="card-buttons">
            <button
              className="card-button"
              onClick={() => navigate("/createcontest")}
            >
              <FontAwesomeIcon icon={faPlus} />
              Create a contest
            </button>
            <button
              className="card-button"
              onClick={() => navigate("/contests")}
            >
              <FontAwesomeIcon icon={faTasks} />
              Manage Contest
            </button>
          </div>
        </div>
        {stats.map((stat) => (
          <StatsCard
            key={stat.label}
            label={stat.label}
            number={stat.number}
            change={stat.change}
            term={stat.term}
          />
        ))}
      </main>
    </div>
  );
};

export default Dashboard;
