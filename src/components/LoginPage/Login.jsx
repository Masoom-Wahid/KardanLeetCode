import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import parseJwt from "./JWTParser";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");

    if (accessToken !== null) {
      let parsed_data = parseJwt(accessToken);
      parsed_data.is_superuser ? navigate("/admin") : navigate("/home");
    }
  });
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
      localStorage.clear()
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
    <div className="flex flex-col md:flex-row h-screen font-sans">
      <div className="bg-gradient-to-r from-blue-900 to-blue-500 font-bebas-neue flex justify-center items-center flex-col text-white p-6 md:p-10 box-border md:w-1/2">
        <div className="content-login">
          <div className="contents">
            <h1 className="title text-5xl font-bold">Kardan Contest</h1>
            <p className="description text-xl">
              The most popular programming contest in Afghanistan.
            </p>
          </div>
          <button className="read-more-button" onClick={() => navigate("/about")}>
            
              Meet The Creators
            
          </button>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center flex-col p-6 md:p-10 box-border">
        <img
          src="/logo.png"
          alt="Kardan University Logo"
          className="logo w-32 h-32 mb-8 mt-2"
        />
        <div className="welcome-content">
          <h2 className="welcome-header text-2xl font-bold">Hello Again!</h2>
          <p className="welcome-back text-xl">Welcome Back</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form max-w-sm w-full">
          <div className="input-group relative mb-4 mt-8">
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <input
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="inputField pl-10"
            />
          </div>
          <div className="input-group relative mb-4">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="inputField pl-10"
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-7 top-1/2 transform -translate-y-1/2 bg-none border-none text-gray-500 cursor-pointer"
            >
              {isPasswordVisible ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit" className="login-button w-full">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
