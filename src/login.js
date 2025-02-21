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

  // ✅ ฟังก์ชันเข้าสู่ระบบ
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("🔍 กำลังส่งข้อมูลเข้าสู่ระบบ...");

    try {
        const response = await axios.post("http://localhost:5001/api/login", { username, password });
        console.log("✅ Response:", response.data);

        const { success, user } = response.data;
        if (success) {
            alert("🎉 เข้าสู่ระบบสำเร็จ!");
            localStorage.setItem("user", JSON.stringify(user));

            if (success) {
              alert("🎉 เข้าสู่ระบบสำเร็จ!");
              console.log("🛠 User Data ที่บันทึก:", user);
              localStorage.setItem("user", JSON.stringify(user));
          }          
            // ✅ เช็ค role แล้ว navigate ไปหน้าเหมาะสม
            if (user.role === "IT") navigate("/welcome-it");
            else if (user.role === "Approver") navigate("/welcome");
            else if (user.role === "User") navigate("/welcome-users");
            else alert("⚠️ บทบาทของคุณไม่ถูกต้อง");
        } else {
            alert("❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        }
    } catch (error) {
        console.error("❌ Login Error:", error);
        alert(error.response?.data?.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
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
          <form onSubmit={handleLogin}>
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
