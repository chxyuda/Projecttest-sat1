import React, { useState, useEffect } from "react";
import Header from "../Header";
import "./ITDashboard.css";
import userIcon from "../assets/icon1.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faWarehouse,
  faCogs,
  faUsers,
  faExchangeAlt,
  faFileAlt,
  faTachometerAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";


const ITDashboard = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const navigate = useNavigate();

  // ฟังก์ชันเปลี่ยนหน้า
  const handleNavigation = (path) => {
    navigate(path);
  };

  // อัปเดตเวลาและวันที่
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const dayNames = ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"];
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

  return (
    <div className="it-dashboard">
      {/* Header */}
      <Header currentTime={currentTime} currentDate={currentDate} />

      <div className="navbar-itinfo">
  {/* ฟังก์ชันเมนูด้านซ้าย */}
  <div className="navbar">
  <span onClick={() => handleNavigation("/inventory")}>
    <FontAwesomeIcon icon={faWarehouse} className="menu-icon" /> คลังวัสดุ
  </span>
  <span onClick={() => handleNavigation("/settings")}>
    <FontAwesomeIcon icon={faCogs} className="menu-icon" /> ตั้งค่า
  </span>
  <span onClick={() => handleNavigation("/personnel")}>
    <FontAwesomeIcon icon={faUsers} className="menu-icon" /> บุคลากร
  </span>
  <span onClick={() => handleNavigation("/borrow-return")}>
    <FontAwesomeIcon icon={faExchangeAlt} className="menu-icon" /> ยืม/คืน
  </span>
  <span onClick={() => handleNavigation("/request")}>
    <FontAwesomeIcon icon={faFileAlt} className="menu-icon" /> คำขอเบิก
  </span>
  <span onClick={() => handleNavigation("/dashboard")}>
    <FontAwesomeIcon icon={faTachometerAlt} className="menu-icon" /> Dashboard
  </span>
</div>

{/* IT Staff Info */}
<div className="it-info">
  <span className="logout" onClick={() => handleNavigation("/logout")}>
    <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" /> Log out
  </span>
  <img src={userIcon} alt="IT Staff Icon" className="icon1" />
  <span className="it-text">เจ้าหน้าที่ IT</span>
</div>
</div>

</div>
  );
};

export default ITDashboard;
