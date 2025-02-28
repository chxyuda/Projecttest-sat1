import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ใช้สำหรับเชื่อมต่อ API
import "./ForgotPassword.css";
import userIcon from "../assets/icon.png"; // Path ของไอคอน

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // เก็บอีเมลที่ผู้ใช้กรอก
  const [message, setMessage] = useState(""); // เก็บข้อความแจ้งเตือน
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    try {
      // เรียก API สำหรับส่ง OTP ไปยังอีเมล
      const response = await axios.post("http://newstock.sat.or.th:5001/api/send-otp", { email });
      console.log(response.data); // ตรวจสอบ response จากเซิร์ฟเวอร์

      setMessage("OTP sent successfully. Please check your email.");
      // ไปยังหน้าตรวจสอบโค้ด และส่งอีเมลไปให้หน้าถัดไป
      navigate("/verify-code", { state: { email } });
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Failed to send OTP. Please try again.");
    }
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
          value={email}
          onChange={(e) => setEmail(e.target.value)} // อัปเดตค่า email
        />
        <button className="forgot-password-button" onClick={handleResetPassword}>
          Reset Password
        </button>
        {message && <p className="forgot-password-message">{message}</p>} {/* แสดงข้อความแจ้งเตือน */}
      </div>
    </div>
  );
};

export default ForgotPassword;
