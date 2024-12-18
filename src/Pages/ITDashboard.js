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
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const ITDashboard = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [profileImage, setProfileImage] = useState(userIcon);
  const [formData, setFormData] = useState({
    agency: "ศูนย์เทคโนโลยีสารสนเทศ",
    fullName: "นายสมชาย เทพประทาน",
    phone: "8442",
    email: "itstaff@sat.or.th",
    username: "IT1234",
    password: "P@ssword",
  });

  const navigate = useNavigate();

  // ฟังก์ชันเปลี่ยนหน้า
  const handleNavigation = (path) => {
    navigate(path);
  };

  // ฟังก์ชันเปิด/ปิด Modal
  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  // ฟังก์ชันแก้ไขข้อมูล
  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = () => {
    setIsEditable(false);
    alert("ข้อมูลถูกบันทึกเรียบร้อยแล้ว!");
  };

  const handleCancel = () => {
    setIsEditable(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) { // ตรวจสอบว่าไฟล์เป็นรูปภาพหรือไม่
        const reader = new FileReader();
        reader.onload = () => {
          setProfileImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น!");
      }
    }
  };
  

  // อัปเดตเวลาและวันที่
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const dayNames = [
        "วันอาทิตย์",
        "วันจันทร์",
        "วันอังคาร",
        "วันพุธ",
        "วันพฤหัสบดี",
        "วันศุกร์",
        "วันเสาร์",
      ];
      const monthNames = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
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
    <div className="it-dashboard">
  {/* Header */}
  <Header currentTime={currentTime} currentDate={currentDate} />

  {/* Navbar */}
  <div className="navbar-itinfo">
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
      <span onClick={() => handleNavigation("/request")}>
        <FontAwesomeIcon icon={faFileAlt} className="menu-icon" /> คำขอเบิก
      </span>
      <span onClick={() => handleNavigation("/dashboard")}>
        <FontAwesomeIcon icon={faTachometerAlt} className="menu-icon" /> Dashboard
      </span>
    </div>

    {/* IT Staff Info */}
    <div className="it-info" onClick={toggleProfileModal} style={{ cursor: "pointer" }}>
      <span className="logout" onClick={() => handleNavigation("/logout")}>
        <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" /> Log out
      </span>
      <img src={profileImage} alt="IT Staff Icon" className="icon1" />
      <span className="it-text">เจ้าหน้าที่ IT</span>
    </div>
  </div>
  {/* Modal สำหรับแสดงโปรไฟล์ */}
  {showProfileModal && (
    <div className="modal-overlay">
      <div className="modal-content">
        <FontAwesomeIcon
          icon={faTimes}
          className="close-icon"
          onClick={toggleProfileModal}
        />
        <h2>ข้อมูลบุคลากร</h2>

        {/* รูปโปรไฟล์ */}
        <div className="profile-image-container">
          <div className="profile-image">
            <img src={profileImage} alt="Profile" />
          </div>
          {isEditable && (
            <div className="upload-btn-container">
              <label htmlFor="profile-upload" className="upload-btn">
                เลือกรูปภาพ
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
          )}
        </div>

        {/* ฟอร์มแสดงข้อมูล */}
        <div className="profile-form">
          <label>ชื่อหน่วยงาน:</label>
          <input
            type="text"
            name="agency"
            value={formData.agency}
            onChange={handleInputChange}
            disabled={!isEditable}
          />
          <label>ชื่อ - นามสกุล:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            disabled={!isEditable}
          />
          <label>เบอร์ติดต่อ:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={!isEditable}
          />
          <label>E-mail:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditable}
          />
          <label>USERNAME:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            disabled={!isEditable}
          />
          <label>PASSWORD:</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={!isEditable}
          />
        </div>

        {/* ปุ่มควบคุม */}
        <div className="btn-group">
          {!isEditable ? (
            <button className="btn edit-btn" onClick={handleEdit}>
              แก้ไข
            </button>
          ) : (
            <>
              <button className="btn save-btn" onClick={handleSave}>
                บันทึก
              </button>
              <button className="btn cancel-btn" onClick={handleCancel}>
                ยกเลิก
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default ITDashboard;
