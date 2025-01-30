import React, { useState, useEffect } from "react";
import Header from "../Header";
import "./ITDashboard.css";
import userIcon from "../assets/icon1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  faCogs,
  faUsers,
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
    agency: "",
    fullName: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // ฟังก์ชันเปลี่ยนหน้า
  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    console.log("✅ IT Dashboard Loaded");
  }, []);
  
  // ฟังก์ชันเปิด/ปิด Modal และดึงข้อมูลบุคลากร
  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  
    if (!showProfileModal) {
      setIsLoading(true);
      axios
        .get("http://localhost:5001/api/staff-info", { params: { username: "itstaff" } })
        .then((response) => {
          console.log("Response data from API:", response.data);
          if (response.data) {
            setFormData({
              agency: response.data.department_name || "N/A",
              fullName: response.data.fullName || "N/A",
              phone: response.data.phone || "N/A",
              email: response.data.email || "N/A",
              username: response.data.username || "N/A",
              password: response.data.password || "N/A",
            });
          } else {
            alert("ไม่พบข้อมูลในฐานข้อมูล");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching staff info:", error.message);
          alert("เกิดข้อผิดพลาดในการดึงข้อมูลบุคลากร");
          setIsLoading(false);
        });
    }
  };  

  // ฟังก์ชันแก้ไขข้อมูล
  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = () => {
    setIsLoading(true);
    axios
      .post("http://localhost:5001/api/update-staff-info", formData)
      .then((response) => {
        console.log("Response from update:", response.data);
        alert("ข้อมูลถูกบันทึกเรียบร้อย!");
        setIsEditable(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error updating staff info:", error.message);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        setIsLoading(false);
      });
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
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น!");
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

  const handleLogout = () => {
    localStorage.removeItem("token"); // ลบ Token ออกจาก LocalStorage (ถ้ามี)
    localStorage.removeItem("user");  // ลบข้อมูล User (ถ้ามี)
    navigate("/"); // กลับไปที่หน้า Login
  };
  console.log("✅ IT Dashboard Rendered");
  return (
    <div className="it-dashboard">
      <Header currentTime={currentTime} currentDate={currentDate} />
      <div className="navbar-itinfo">
        <div className="navbar">
          <span onClick={() => handleNavigation("/inventory")}>
            <FontAwesomeIcon icon={faWarehouse} /> คลังวัสดุ
          </span>
          <span onClick={() => handleNavigation("/settings")}>
            <FontAwesomeIcon icon={faCogs} /> ตั้งค่า
          </span>
          <span onClick={() => handleNavigation("/personnel")}>
            <FontAwesomeIcon icon={faUsers} /> บุคลากร
          </span>
          <span onClick={() => handleNavigation("/borrow-return")}>
            <FontAwesomeIcon icon={faFileAlt} /> ยืม & คืน
          </span>
          <span onClick={() => handleNavigation("/request")}>
            <FontAwesomeIcon icon={faFileAlt} /> คำขอเบิก
          </span>
          <span onClick={() => handleNavigation("/dashboard")}>
            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
          </span>
          <span onClick={() => handleLogout("/logout")} className="logout">
            <FontAwesomeIcon icon={faSignOutAlt} /> ออกจากระบบ
          </span>
        <div className="it-info" onClick={toggleProfileModal}>
          <img src={profileImage} alt="IT Staff Icon" className="user-icon" />
          <span>เจ้าหน้าที่ฝ่าย IT</span>
        </div>
      </div>
    </div>
      {showProfileModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <FontAwesomeIcon icon={faTimes} onClick={toggleProfileModal} />
            <h2>ข้อมูลบุคลากร</h2>
            {isLoading ? (
              <p>กำลังโหลดข้อมูล...</p>
            ) : (
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
                {/* เพิ่มฟิลด์ข้อมูลอื่น ๆ */}
                <label>เบอร์โทรศัพท์:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
                <label>อีเมล:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
              </div>
            )}

            <div>
              {!isEditable ? (
                <button onClick={handleEdit}>แก้ไข</button>
              ) : (
                <>
                  <button onClick={handleSave}>บันทึก</button>
                  <button onClick={handleCancel}>ยกเลิก</button>
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
