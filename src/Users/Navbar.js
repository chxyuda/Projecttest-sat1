import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faBox,
  faChartLine,
  faHistory,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import ProfileModal from "../Pages/ProfileModal";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
const [currentDate, setCurrentDate] = useState("");


  // ✅ โหลดข้อมูลผู้ใช้จาก LocalStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser.username) {
      alert("⚠️ ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่");
      window.location.href = "/login";
      return;
    }
    axios
      .get(`http://localhost:5001/api/profile?username=${storedUser.username}`)
      .then((response) => {
        setUserData(response.data);
        setProfileData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ ดึงข้อมูลผู้ใช้ล้มเหลว:", error);
        alert("❌ ไม่สามารถโหลดข้อมูลได้");
        setLoading(false);
      });
  }, []);
  
  useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date();
        const dayNames = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"];
        const monthNames = [
          "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม",
          "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน",
          "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];
        const dayName = dayNames[now.getDay()];
        const day = now.getDate();
        const month = monthNames[now.getMonth()];
        const year = now.getFullYear() + 543;
  
        setCurrentTime(now.toLocaleTimeString("th-TH", { hour12: false }));
        setCurrentDate(`${dayName}ที่ ${day} ${month} ${year}`);
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);

  return (
    <nav className="navbar-container">
      <div className="nav">
        <Link to="/borrow">
          <FontAwesomeIcon icon={faFileAlt} /> ยืมวัสดุ
        </Link>
        <Link to="/RequestForm">
          <FontAwesomeIcon icon={faBox} /> เบิกวัสดุ
        </Link>
        <Link to="/track">
          <FontAwesomeIcon icon={faChartLine} /> ติดตามสถานะคำขอ
        </Link>
        <Link to="/WithdrawalHistory">
          <FontAwesomeIcon icon={faHistory} /> ประวัติการเบิก-การยืม-คืน
        </Link>
      </div>

      {/* ✅ ปุ่มออกจากระบบ และโปรไฟล์ผู้ใช้ */}
      <div className="user-info">
        <button onClick={() => { localStorage.removeItem("user"); navigate("/"); }} className="logout">
          <FontAwesomeIcon icon={faSignOutAlt} /> ออกจากระบบ
        </button>

        {userData && (
          <div className="it-info" onClick={() => setShowProfile(true)}>
            <FontAwesomeIcon icon={faUser} className="user-icon" />
            <span>{userData?.department_name || "ไม่ระบุฝ่าย/สำนัก"}</span>
          </div>
        )}
      </div>

      {/* ✅ Profile Modal Popup */}
      {showProfile && (
        <ProfileModal
          onClose={() => setShowProfile(false)}
          userData={profileData}
          loading={loading}
        />
      )}
    </nav>
  );
}
