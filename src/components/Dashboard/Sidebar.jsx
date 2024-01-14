import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faPlus,
  faTasks,
  faUserPlus,
  faSignOutAlt,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css"; // You might want to create a separate CSS file for the sidebar

const navItems = [
  { name: "Dashboard", icon: faTachometerAlt },
  { name: "Create Contest", icon: faPlus },
  { name: "Show Contest", icon: faTasks },
  { name: "Create Users", icon: faUserPlus },
  { name: "Results", icon: faChartLine },
];

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <img
        src="/kardanLogo.png"
        alt="Kardan University Logo"
        className="logo-dashboard"
      />
      {navItems.map((item) => (
        <div key={item.name} className="nav-item">
          <FontAwesomeIcon icon={item.icon} />
          {item.name}
        </div>
      ))}
      <button className="logout-button">
        <FontAwesomeIcon icon={faSignOutAlt} />
        Log Out
      </button>
    </nav>
  );
};

export default Sidebar;
