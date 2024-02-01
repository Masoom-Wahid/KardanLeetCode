import React from "react";
import Sidebar from "../Sidebar/Sidebar"; // Import your Sidebar component
import "./Layout.css"; // Import layout CSS

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        {children} {/* This is where your main content will be rendered */}
      </div>
    </div>
  );
};

export default Layout;
