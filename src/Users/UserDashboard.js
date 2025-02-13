import React, { useEffect, useState } from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userIcon from "../assets/icon1.png";
import ProfileModal from "../Pages/ProfileModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faSignOutAlt,
  faClipboardList,
  faListAlt,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser.username) {
      alert("⚠️ กรุณาเข้าสู่ระบบใหม่");
      window.location.href = "/login";
      return;
    }

    axios
      .get(`http://localhost:5001/api/profile?username=${storedUser.username}`)
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch(() => {
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
        "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม",
        "พฤศจิกายน", "ธันวาคม"
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

  const handleLogout = () => {
    if (window.confirm("คุณต้องการออกจากระบบจริงหรือไม่?")) {
      localStorage.removeItem("user");
      alert("คุณได้ออกจากระบบแล้ว!");
      setTimeout(() => window.location.href = "/", 500);
    }
  };

  return (
    <div className="user-dashboard-page">
      <Header currentTime={currentTime} currentDate={currentDate} />

      <div className="user-navbar-wrapper">
        <div className="user-navbar">
          <span onClick={() => navigate("/borrow")}>
            <FontAwesomeIcon icon={faClipboardList} /> เบิก/ยืม-คืน
          </span>
          <span onClick={() => navigate("/requestStatus")}>
            <FontAwesomeIcon icon={faListAlt} /> สถานะคำขอเบิก
          </span>
          <span onClick={() => navigate("/borrowStatus")}>
            <FontAwesomeIcon icon={faFileAlt} /> สถานะการยืม-คืน
          </span>
          <span onClick={() => navigate("/requesthistory")}>
            <FontAwesomeIcon icon={faFileAlt} /> ประวัติการเบิก
          </span>
          <span onClick={() => navigate("/withdrawalHistory")}>
            <FontAwesomeIcon icon={faFileAlt} /> ประวัติการยืม-คืน
          </span>
          <span onClick={() => navigate("/user-dashboard")}>
            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
          </span>
          <span onClick={handleLogout} className="user-logout">
            <FontAwesomeIcon icon={faSignOutAlt} /> ออกจากระบบ
          </span>
        </div>

        <div className="user-info-section" onClick={() => setShowProfile(true)}>
          <img src={userData?.image || userIcon} alt="User Icon" />
          <span>{userData?.department_name || "ไม่ระบุฝ่าย"}</span>
        </div>
      </div>

      {showProfile && (
        <div className="user-profile-modal">
          <ProfileModal
            onClose={() => setShowProfile(false)}
            userData={userData}
            loading={loading}
          />
        </div>
      )}

    </div>
  );
};

export default UserDashboard;
