import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./CreateUser.css";
import Sidebar from "./Sidebar";

const BASE_URL = process.env.REACT_APP_API_URL;

const CreateUser = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {};

  return (
    <div className="login-page">
      <Sidebar />
      <div className="right-panel">
        <img src="/logo.png" alt="Kardan University Logo" className="logo" />
        <div className="welcome-content">
          <h2 className="welcome-header">Welcome!</h2>
          <p className="welcome-back">Enter the following</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <FontAwesomeIcon icon={faUser} className="nameIcon" />
            <input
              className="name"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <FontAwesomeIcon icon={faUser} className="emailIcon" />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
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
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
