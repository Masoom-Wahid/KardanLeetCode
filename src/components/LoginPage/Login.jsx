import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the login logic here
    console.log("Login submitted", { username, password });
  };

  return (
    <div className="login-page">
      <div className="left-panel">
        <div className="content">
          <div className="contents">
            <h1 className="title left-title">Kardan Contest</h1>
            <p className="description left-description">
              The most popular programming contest in Afghanistan.
            </p>
          </div>
          <button className="read-more-button">Read More</button>
        </div>
      </div>
      <div className="right-panel">
        <img src="/logo.png" alt="Kardan University Logo" className="logo" />
        <div className="welcome-content">
          <h2 className="welcome-header">Hello Again!</h2>
          <p className="welcome-back">Welcome Back</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div
            className="
    
    input-group"
          >
            <FontAwesomeIcon icon={faLock} />
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="visibility-toggle"
            >
              {isPasswordVisible ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <a href="#forgot-password" className="forgot-password">
            Forgot Password
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
