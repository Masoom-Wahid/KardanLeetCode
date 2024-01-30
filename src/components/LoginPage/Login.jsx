import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import parseJwt from "./JWTParser";
import { useNavigate } from "react-router-dom";
import "./Login.css";



const BASE_URL = process.env.REACT_APP_API_URL



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();
   useEffect(() => {
      let accessToken = localStorage.getItem("accessToken")

      if (accessToken !== undefined){
          let parsed_data = parseJwt(accessToken);
        parsed_data.is_superuser ? navigate("/admin") : navigate("/home");
      }

    })
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);




    try {
      const response = await fetch(`${BASE_URL}auth/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      // Just Parse The Data and set it to local storage
      let parsed_data = parseJwt(data.access);
      localStorage.setItem("username", parsed_data.username);
      localStorage.setItem("is_su", parsed_data.is_superuser);
      // naviagate depending on the user's token
      parsed_data.is_superuser ? navigate("/admin") : navigate("/home");
    } catch (error) {
      window.alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-page">
      <div className="left-panel">
        <div className="content-login">
          <div className="contents">
            <h1 className="title left-title">Kardan Contest</h1>
            <p className="description left-description">
              The most popular programming contest in Afghanistan.
            </p>
          </div>
          <button className="read-more-button">
            <a href="https://kardan.edu.af/" target="__blank">
              Read More
            </a>
          </button>
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
            <FontAwesomeIcon icon={faUser} className="faUserIcon" />
            <input
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="username inputField"
            />
          </div>
          <div
            className="
    
    input-group"
          >
            <FontAwesomeIcon icon={faLock} className="faLockIcon" />
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="password inputField"
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
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
