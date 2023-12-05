// React component structure for the university coding competition website

import React from "react";
// Import Tailwind CSS
import "tailwindcss/tailwind.css";
import "./main.css";

// Navbar component
const Navbar = () => {
  // Replace hrefs with actual routing paths if using React Router
  return (
    <nav className="flex justify-between items-center bg-purple-600 text-white p-4">
      <div className="logo">
        {/* Add your logo here */}
        <span>LOGO</span>
      </div>
      <div className="nav-links flex">
        {/* Add active classes based on the current route */}
        <a href="#home" className="mx-2 hover:text-gray-300">
          Home
        </a>
        <a href="#challenges" className="mx-2 hover:text-gray-300">
          Challenges
        </a>
        <a href="#leaderboard" className="mx-2 hover:text-gray-300">
          Leaderboard
        </a>
        <a href="#resources" className="mx-2 hover:text-gray-300">
          Resources
        </a>
        <a href="#events" className="mx-2 hover:text-gray-300">
          Events
        </a>
        <a href="#contact" className="mx-2 hover:text-gray-300">
          Contact
        </a>
      </div>
      <div className="auth-links">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
          Login
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
          Get Started
        </button>
      </div>
    </nav>
  );
};

// MainComponent for the landing page
const MainComponent = () => {
  return (
    <div className="main-container">
      <Navbar />
      <header className="header-content text-white bg-purple-700 p-8">
        <h1 className="text-4xl mb-2">
          Code, Compete, Conquer: Unlock Your Potential in the Arena of
          Innovation
        </h1>
        <p className="mb-4">
          Provides you with the latest online learning system and material that
          help your knowledge growing.
        </p>
        <div className="search-bar mb-4">
          <input type="text" placeholder="Want to learn?" className="p-2" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Explore
          </button>
        </div>
        <div className="partners-slider">
          {/* Carousel for partners' logos */}
          {/* You can use a library like Swiper for this */}
        </div>
      </header>
      {/* Rest of the components such as challenge list, leaderboard, etc. */}
      {/* Include animations for transitions and interactive elements */}
    </div>
  );
};

export default MainComponent;
