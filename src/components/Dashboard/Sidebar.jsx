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
  faBarsProgress,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";

const navItems = [
  { name: "Dashboard", icon: faTachometerAlt, path: "/admin" },
  { name: "Create Contest", icon: faPlus, path: "/createcontest" },
  { name: "Show Contest", icon: faTasks, path: "/contests" },
  { name: "Manage Contest", icon: faBarsProgress, path: "/manageContest" },
  { name: "Create User", icon: faUserPlus, path: "/createUser" },
  { name: "Results", icon: faChartLine, path: "/results" },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav
      className={`${styles.sidebar} ${
        isCollapsed ? styles.collapsed : styles.unCollapse
      }`}
    >
      <img
        src="/kardanLogo.png"
        alt="Kardan University Logo"
        className={styles.logoDashboard}
      />
      <div className={styles.navItems}>
        {navItems.map((item) => (
          <div
            key={item.name}
            className={styles.navItem}
            onClick={() => navigate(item.path)}
          >
            <FontAwesomeIcon icon={item.icon} />
            {!isCollapsed && item.name}
          </div>
        ))}
      </div>
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isCollapsed ? faAngleRight : faAngleLeft} />
      </button>
      <button className={styles.logoutButton}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        {!isCollapsed && " Log Out"}
      </button>
    </nav>
  );
};

export default Sidebar;
