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
import "./Sidebar.css";

const navItems = [
  { name: "Dashboard", icon: faTachometerAlt },
  { name: "Create Contest", icon: faPlus },
  { name: "Show Contest", icon: faTasks },
  { name: "Create Users", icon: faUserPlus },
  { name: "Results", icon: faChartLine },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
          <div key={item.name} className="nav-item">
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
