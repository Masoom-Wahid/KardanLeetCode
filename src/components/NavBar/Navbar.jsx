import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <header className="styled-app-bar">
      <nav className="toolbar">
        <button className="logo-button" onClick={() => navigate("/")}>
          <img src="/KardanGray.png" alt="logo" className="logo-icon" />
        </button>
        <div className="flex-grow-box">
          <button className="nav-button" onClick={() => navigate("/compete")}>
            My Score
          </button>
          <button
            className="nav-button"
            onClick={() => navigate("/challenges")}
          >
            Challenges
          </button>
          <button
            className="nav-button"
            onClick={() => navigate("/competitions")}
          >
            Competitions
          </button>
        </div>
        <div className="icons-box">
          <button className="icon-button" onClick={() => {}}>
            <FontAwesomeIcon icon={faBell} />
          </button>
          <button className="icon-button" onClick={() => {}}>
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
