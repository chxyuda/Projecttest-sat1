import React, { useEffect, useState } from "react";
import axios from "axios"; // สำหรับดึงข้อมูลจาก API
import "./StaffProfile.css"; // ไฟล์ CSS (ถ้าต้องการตกแต่ง)

const StaffProfile = () => {
  const [staffInfo, setStaffInfo] = useState({});

  // ดึงข้อมูลจาก API เมื่อ Component โหลด
  useEffect(() => {
    axios
      .get("http://newstock.sat.or.th:5001/api/staff-info") // API ที่ใช้ดึงข้อมูลเจ้าหน้าที่
      .then((response) => {
        setStaffInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching staff info:", error);
      });
  }, []);

  return (
    <div className="staff-profile-container">
      <h1>ข้อมูลเจ้าหน้าที่</h1>
      <div className="profile-details">
        <p><strong>ชื่อ:</strong> {staffInfo.fullName}</p>
        <p><strong>ตำแหน่ง:</strong> {staffInfo.role}</p>
        <p><strong>เบอร์โทร:</strong> {staffInfo.phone}</p>
        <p><strong>อีเมล:</strong> {staffInfo.email}</p>
      </div>
    </div>
  );
};

export default StaffProfile;
