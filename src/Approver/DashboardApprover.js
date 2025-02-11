import React, { useEffect, useState } from 'react';
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import userIcon from '../assets/icon1.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  faCogs,
  faUsers,
  faFileAlt,
  faTachometerAlt,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import './DashboardApprover.css';

const DashboardApprover = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser.username) {
      alert("⚠️ กรุณาเข้าสู่ระบบใหม่");
      window.location.href = "/login";
      return;
    }

    axios.get(`http://localhost:5001/api/profile?username=${storedUser.username}`)
      .then(response => {
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
      const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
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
    <div className="approver-dashboard">
      <Header currentTime={currentTime} currentDate={currentDate} />
      <div className="navbar-approver">
        <div className="navbar">
          <span onClick={() => navigate("/")}> <FontAwesomeIcon icon={faWarehouse} /> คลังวัสดุ</span>
          <span onClick={() => navigate("/")}> <FontAwesomeIcon icon={faCogs} />สถานะการขอเบิก</span>
          <span onClick={() => navigate("/")}> <FontAwesomeIcon icon={faUsers} /> สถานะการยืม-คืน</span>
          <span onClick={() => navigate("/")}> <FontAwesomeIcon icon={faFileAlt} /> ประวัติการเบิก-การยืม-คืน</span>
          <span onClick={() => navigate("/")}> <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</span>
          <span onClick={handleLogout} className="logout"> <FontAwesomeIcon icon={faSignOutAlt} /> ออกจากระบบ</span>
          <div className="approver-info">
            <img src={userData?.image || userIcon} alt="User Icon" className="user-icon" />
            <span>{userData?.department_name || "ไม่ระบุฝ่าย/สำนัก"}</span>
          </div>
        </div>
      </div>

      {/* ✅ เพิ่มข้อมูลผู้ใช้ให้ครบถ้วน */}
      <div className="profile-card">
        <h2 className="dashboard-title"> <FontAwesomeIcon icon={faUsers} color="red" /> ผู้อนุมัติ</h2>
        <img src={userData?.image || userIcon} alt="User Icon" className="user-icon" />
        <h3 className="user-name">{userData?.fullName || "ไม่ระบุชื่อ"}</h3>
        <p className="user-email">📧 {userData?.email}</p>
        <p className="user-department">🏢 ฝ่าย: {userData?.department_name || "ไม่ระบุฝ่าย"}</p>
      </div>
    </div>
  );
};

export default DashboardApprover;
