import React from "react";
import "./login.css"; // ไฟล์ CSS สำหรับจัดการสไตล์
import userIcon from "./assets/icon.png"; // ไอคอน
import backgroundVideo from "./assets/background.mp4"; // วิดีโอพื้นหลัง

const Login = () => {
  return (
    <div className="login-page">
      {/* วิดีโอพื้นหลัง */}
      <video autoPlay muted loop className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* กล่องสำหรับการเข้าสู่ระบบ */}
      <div className="login-container">
        <div className="login-box">
          <div className="user-icon">
            <img src={userIcon} alt="User Icon" />
          </div>
          <h3>Login</h3>
          <form>
            <input type="text" placeholder="Username" className="login-input" />
            <input type="password" placeholder="Password" className="login-input" />
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
