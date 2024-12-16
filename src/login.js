import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import userIcon from "./assets/icon.png";
import backgroundVideo from "./assets/background.mp4";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        username,
        password,
      });
  
      if (response.data.success) {
        const role = response.data.role;
  
        if (role === "IT") {
          navigate("/it-dashboard");
        } else if (role === "Approver") {
          navigate("/approver-dashboard");
        } else {
          alert("บทบาทไม่ถูกต้อง!");
        }
      } else {
        alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ. โปรดลองอีกครั้ง!");
    }
  };
  
  return (
    <div className="login-page">
      <video autoPlay muted loop className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="login-container">
        <div className="login-box">
          <div className="user-icon">
            <img src={userIcon} alt="User Icon" />
          </div>
          <h3>Login</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="forgot-password">
              <a href="/forgot-password">forgot password?</a>
            </p>
            <div className="button-group">
              <a href="/signup" className="btn signup-btn">
                Sign up
              </a>
              <button type="submit" className="btn login-btn">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
