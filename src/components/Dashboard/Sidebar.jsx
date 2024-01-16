import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faTachometerAlt,
  faPlus,
  faTasks,
  faUserPlus,
  faSignOutAlt,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const navItems = [
  { name: "Dashboard", icon: faTachometerAlt, path: "/admin" },
  { name: "Create Contest", icon: faPlus, path: "/createcontest" },
  { name: "Show Contest", icon: faTasks, path: "/showcontest" },
  { name: "Create Users", icon: faUserPlus, path: "/createusers" },
  { name: "Results", icon: faChartLine, path: "/results" },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <img
        src="/kardanLogo.png"
        alt="Kardan University Logo"
        className="logo-dashboard"
      />
      <div className="nav-items">
        {navItems.map((item) => (
          <div
            key={item.name}
            className="nav-item"
            onClick={() => navigate(item.path)}
          >
            <FontAwesomeIcon icon={item.icon} />
            {!isCollapsed && item.name}
          </div>
        ))}
      </div>
      <button className="toggle-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isCollapsed ? faAngleRight : faAngleLeft} />
      </button>
      <button className="logout-button">
        <FontAwesomeIcon icon={faSignOutAlt} />
        {!isCollapsed && " Log Out"}
      </button>
    </nav>
  );
};

export default Sidebar;
