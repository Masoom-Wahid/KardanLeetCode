// NavBar.js
import React, { useState, useEffect } from "react";
import styles from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faLightbulb,
  faPen,
  faUsers,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 0);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove the token from localStorage
    navigate("/");
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleChallenges = () => {
    navigate("/contest");
  };

  const handleScores = () => {
    navigate("/leaderboard");
  };

  const navItems = [
    { icon: faHome, text: "Home", action: handleHome },
    { icon: faSignOut, text: "Logout", action: handleLogout },
  ];

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.fixedNavbar : ""}`}>
      <div className={styles.logoContainer}>
        <img
          src="/kardanLogo.png"
          alt="Kardan University Logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.navItems}>
        {navItems.map((item, index) => (
          <div
            className={`${styles.navItem} ${
              index === activeIndex ? styles.active : ""
            }`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onClick={item.action}
            key={index}
          >
            <FontAwesomeIcon icon={item.icon} className={styles.icon} />
            <span className={styles.text}>{item.text}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
