import React, { useState, useEffect } from "react";
import Header from "../Header";
import "./ITDashboard.css";
import userIcon from "../assets/icon1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileModal from "./ProfileModal"; // ✅ นำเข้า Modal
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  faCogs,
  faUsers,
  faFileAlt,
  faTachometerAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const ITDashboard = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ ดึง username จาก LocalStorage
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("❌ ไม่พบ username กรุณาเข้าสู่ระบบใหม่");
      navigate("/login");
      return;
    }

    // ✅ โหลดข้อมูลผู้ใช้
    axios
      .get(`http://localhost:5001/api/profile?username=${username}`)
      .then((response) => {
        setProfileData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching profile:", error);
        alert("❌ ไม่สามารถโหลดข้อมูลโปรไฟล์");
        setLoading(false);
      });
  }, []);

  // ✅ อัปเดตเวลาและวันที่
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

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="it-dashboard">
      <Header currentTime={currentTime} currentDate={currentDate} />
      <div className="navbar-itinfo">
        <div className="navbar">
          <span onClick={() => navigate("/inventory")}>
            <FontAwesomeIcon icon={faWarehouse} /> คลังวัสดุ
          </span>
          <span onClick={() => navigate("/settings")}>
            <FontAwesomeIcon icon={faCogs} /> ตั้งค่า
          </span>
          <span onClick={() => navigate("/personnel")}>
            <FontAwesomeIcon icon={faUsers} /> บุคลากร
          </span>
          <span onClick={() => navigate("/borrow-return")}>
            <FontAwesomeIcon icon={faFileAlt} /> ยืม & คืน
          </span>
          <span onClick={() => navigate("/dashboard")}>
            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
          </span>
          <span onClick={handleLogout} className="logout">
            ออกจากระบบ
          </span>

          {/* ✅ คลิกที่โปรไฟล์แล้วเปิด Modal */}
          <div className="it-info" onClick={() => setShowProfile(true)}>
            <img src={profileData?.profileImage || userIcon} alt="User Icon" className="user-icon" />
            <span>{profileData?.agency || "ไม่ระบุฝ่าย/สำนัก"}</span> {/* ✅ ใช้ agency */}
          </div>
        </div>
      </div>

      {/* ✅ Profile Modal Popup */}
      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} userData={profileData} loading={loading} />}
    </div>
  );
};

export default ITDashboard;
