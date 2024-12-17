import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./VerifyCode.css";

const VerifyCode = () => {
  const [otp, setOtp] = useState(["", "", "", ""]); // State สำหรับเก็บ OTP 4 หลัก
  const [message, setMessage] = useState(""); // State สำหรับข้อความแจ้งเตือน
  const location = useLocation();
  const navigate = useNavigate();

  // รับ email จาก state ของ React Router (มาจาก ForgotPassword.js)
  const email = location.state?.email || "";

  // ฟังก์ชันอัปเดตค่า OTP ตาม input แต่ละช่อง
  const handleInputChange = (index, value) => {
    if (isNaN(value)) return; // อนุญาตเฉพาะตัวเลข
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // รับแค่ตัวสุดท้ายที่กรอก
    setOtp(newOtp);

    // ย้ายไปยังช่องถัดไปอัตโนมัติ
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // ฟังก์ชันสำหรับการยืนยัน OTP
  const handleVerifyOtp = async () => {
    const otpCode = otp.join(""); // รวม OTP 4 ช่องเป็น String เดียว
    if (otpCode.length !== 4) {
      setMessage("Please enter the complete 4-digit code.");
      return;
    }

    try {
      // เรียก API ยืนยัน OTP
      const response = await axios.post("http://localhost:5001/api/verify-otp", {
        email,
        otp: otpCode,
      });

      setMessage(response.data.message); // แสดงข้อความสำเร็จ
      // ไปหน้าตั้งรหัสผ่านใหม่หลังจากยืนยันสำเร็จ
      navigate("/set-new-password", { state: { email } });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("Invalid or expired OTP. Please try again.");
    }
  };

  return (
    <div className="verify-code-container">
      <div className="verify-code-box">
        <h1>Verify Code</h1>
        <p>We sent a code to your email. Please enter the code below:</p>
        <div className="code-inputs">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}
        </div>
        <button className="verify-code-button" onClick={handleVerifyOtp}>
          Verify
        </button>
        {message && <p className="verify-code-message">{message}</p>} {/* แสดงข้อความแจ้งเตือน */}
      </div>
    </div>
  );
};

export default VerifyCode;
