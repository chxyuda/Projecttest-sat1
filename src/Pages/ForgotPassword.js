import React from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import userIcon from "../assets/icon.png"; // Path ของไอคอน

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleResetPassword = () => {
    // เพิ่ม Logic สำหรับการตรวจสอบหรือการส่งข้อมูล
    console.log("Reset password requested");
    navigate("/verify-code"); // เปลี่ยนหน้าไปยังหน้าตรวจสอบโค้ด
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <img src={userIcon} alt="User Icon" className="forgot-password-icon" />
        <h1>Forgot Password</h1>
        <input
          type="email"
          placeholder="Enter your email"
          className="forgot-password-input"
        />
        <button className="forgot-password-button" onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
