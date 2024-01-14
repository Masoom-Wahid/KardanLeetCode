import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faPlus,
  faTasks,
  faUserPlus,
  faSignOutAlt,
  faTachometerAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <img
          src="/kardanLogo.png"
          alt="Kardan University Logo"
          className="logo-dashboard"
        />
        <div className="nav-item">
          <FontAwesomeIcon icon={faTachometerAlt} />
          Dashboard
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon={faPlus} />
          Create Contest
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon={faTasks} />
          Show Contest
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon={faUserPlus} />
          Create Users
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon={faChartLine} />
          Results
        </div>
        <button className="logout-button">
          <FontAwesomeIcon icon={faSignOutAlt} />
          Log Out
        </button>
      </nav>
      <main className="main-content">
        <div className="welcome-card">
          <div className="welcome-content">
            <h1 className="welcome-title">
              Welcome to the Kardan University Contest Web App.
            </h1>
            <p className="welcome-description">
              As a website adminstrator, your role involves organizing a
              balanced contest for students to showcase their programming
              skills, positively influencing the university's academic standing.
              Crafting an engaging event reflects the institution's commitment
              to excellence and talent development in programming education.
              Your efforts contribute significantly to the university's
              reputation for continual improvement.
            </p>
          </div>
          <div className="card-buttons">
            <button className="card-button">
              <FontAwesomeIcon icon={faPlus} />
              Create a contest
            </button>
            <button className="card-button">
              <FontAwesomeIcon icon={faTasks} />
              Manage Contest
            </button>
          </div>
        </div>
        <div className="stats-card">
          <div className="colum-align">
            <FontAwesomeIcon icon={faUserCircle} />
            <div className="stats-label">Contestants</div>
            <div className="stats-number">1000 </div>
          </div>
          <div className="stats-term">
            <div className="stats-change stats-change-number">1.2% </div>
            <div className="stats-change">This Term</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
