// NavBar.js
import React, { useState, useEffect } from "react";
import styles from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faLightbulb,
  faPen,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const navItems = [
    { icon: faHome, text: "Home" },
    { icon: faLightbulb, text: "Challenges" },
    { icon: faPen, text: "Scores" },
    { icon: faUsers, text: "Contests" },
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
