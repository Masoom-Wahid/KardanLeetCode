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
  { label: "Winter2023", date: "2023-11-1" },
  { label: "Spring2024", date: "2024-2-10" },
  { label: "Fall2024", date: "2024-7-15" },
];

const id = 1;

const StatsCard = ({ label, date }) => (
  <div className="stats-card">
    <div className="column-align">
      <FontAwesomeIcon icon={faUserCircle} className="stats-icon " />
      <div className="stats-labels">
        <button className="stats-name">{label}</button>
        <div className="stats-number">Date: {date}</div>
      </div>
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
        <div className="stats-cards">
          {stats.map((stat) => (
            <StatsCard label={stat.label} date={stat.date} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
