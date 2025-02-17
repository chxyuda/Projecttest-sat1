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
  const [userData, setUserData] = useState(null); // ✅ เพิ่ม useState
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ ดึง username จาก LocalStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("🛠 ค่าที่โหลดจาก LocalStorage:", storedUser);
  
    if (!storedUser || !storedUser.username) {
      alert("⚠️ ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่");
      window.location.href = "/login"; // รีไดเรคไป login ถ้าไม่มี user
      return;
    }
  
    axios
      .get(`http://localhost:5001/api/profile?username=${storedUser.username}`)
      .then((response) => {
        console.log("✅ ข้อมูลจาก API:", response.data);
        setUserData(response.data);
        setProfileData(response.data); // ✅ เพิ่มให้ profileData ได้รับค่าจาก API
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ ดึงข้อมูลผู้ใช้ล้มเหลว:", error);
        alert("❌ ไม่สามารถโหลดข้อมูลได้");
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
    const confirmLogout = window.confirm("คุณต้องการออกจากระบบจริงหรือไม่?");
    if (confirmLogout) {
      console.log("🔴 ออกจากระบบ...");
  
      // ✅ เคลียร์ข้อมูล LocalStorage
      localStorage.removeItem("user"); 
  
      // ✅ แสดงข้อความก่อนเปลี่ยนหน้า
      alert("คุณได้ออกจากระบบแล้ว!");
  
      // ✅ ใช้ setTimeout เพื่อให้ LocalStorage เคลียร์ก่อน แล้วค่อย navigate
      setTimeout(() => {
        window.location.href = "/"; // ✅ กลับไปที่หน้า Login (ซึ่งกำหนดอยู่ที่ `/`)
      }, 500);
    } else {
      console.log("✅ ยกเลิกการออกจากระบบ");
    }
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
           <span onClick={() => navigate("/Request")}>
            <FontAwesomeIcon icon={faFileAlt} /> คำขอเบิก
          </span>
          <span onClick={() => navigate("/dashboard")}>
            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
          </span>
          <span onClick={handleLogout} className="logout">
  <FontAwesomeIcon icon={faSignOutAlt} /> ออกจากระบบ
</span>
          {/* ✅ คลิกที่โปรไฟล์แล้วเปิด Modal */}
          <div className="it-info" onClick={() => setShowProfile(true)}>
  <img src={userData?.image || userIcon} alt="User Icon" className="user-icon" />
  <span>{userData?.department_name || "ไม่ระบุฝ่าย/สำนัก"}</span>
</div>                            

        </div>
      </div>

      {/* ✅ Profile Modal Popup */}
      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} userData={profileData} loading={loading} />}
    </div>
  );
};

export default ITDashboard;
