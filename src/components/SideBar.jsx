// Sidebar.jsx
import React, { useState } from "react";
import "./Sidebar.css"; // Your CSS import here

// Import SVGs as React components
import LogoSmall from "./assets/astra.svg"; // Update the path to your SVG file
import ProfilePic from "./assets/profile.png"; // Update the path to your image file

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Function to toggle sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Assuming you will handle navigation using a router library like React Router
  // The href attribute would be replaced by to, and a tags by Link components.

  return (
    <nav className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top-wrapper">
        <div className="sidebar-top">
          <a href="#" className="logo__wrapper" onClick={toggleSidebar}>
            <img src={LogoSmall} alt="Logo" className="logo-small" />
            <span className="hide">Astra</span>
          </a>
        </div>
        <div className="expand-btn" onClick={toggleSidebar}>
          {/* Expand SVG icon goes here, replace with actual SVG component */}
        </div>
      </div>
      {/* ... More content ... */}
      <div className="sidebar__profile">
        <div className="avatar__wrapper">
          <img className="avatar" src={ProfilePic} alt="Profile" />
          <div className="online__status"></div>
        </div>
        <section className="avatar__name hide">
          <div className="user-name">Joe Doe</div>
          <div className="email">joe.doe@atheros.ai</div>
        </section>
        <a href="#logout" className="logout">
          {/* Logout SVG icon goes here, replace with actual SVG component */}
        </a>
      </div>
    </nav>
  );
}

export default Sidebar;
