import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown((passwordShown) => !passwordShown);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login submitted", { email, password });
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="logo">LOGO</div>
          <div className="input-group">
            <input
              type="email" // Changed to type="email" for email input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
          </div>
          <div className="input-group">
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              onClick={togglePasswordVisibility}
              icon={passwordShown ? faEyeSlash : faEye}
              className="password-icon"
            />
          </div>
          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
