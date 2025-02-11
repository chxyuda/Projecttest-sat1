import React, { useState, useEffect } from "react";
import Header from "../Header";
import Navbar from "./Navbar";  // ✅ นำ Navbar มาใช้
import "./UserDashboard.css";
import userIcon from "../assets/icon1.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser.username) {
      alert("⚠️ กรุณาเข้าสู่ระบบใหม่");
      window.location.href = "/login";
      return;
    }

    axios
      .get(`http://localhost:5001/api/profile?username=${storedUser.username}`)
      .then((response) => setUserData(response.data))
      .catch(() => alert("❌ ไม่สามารถโหลดข้อมูลได้"));
  }, []);

  return (
    <>
      <Header />
      
      {/* ✅ ย้าย Navbar มาอยู่ข้างล่าง Header */}
      <div className="navbar-wrapper">
        <Navbar />
      </div>

      <div className="dashboard-container">
        <h2 className="dashboard-title">
          <FontAwesomeIcon icon={faUser} color="red" /> User Dashboard
        </h2>

        <div className="profile-card">
          <img src={userData?.image || userIcon} alt="User Icon" className="user-icon" />
          <h3 className="user-name">{userData?.fullName || "ไม่ระบุชื่อ"}</h3>
          <p className="user-email">{userData?.email}</p>
          <p className="user-department">ฝ่าย: {userData?.department_name || "ไม่ระบุฝ่าย"}</p>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
