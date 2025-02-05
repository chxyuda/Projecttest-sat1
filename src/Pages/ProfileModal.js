import React from "react";
import "./ProfileModal.css"; // ✅ ไฟล์ CSS สำหรับ Modal

const ProfileModal = ({ onClose, userData, loading }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>ข้อมูลบุคลากร</h2>

        {loading ? (
          <p>กำลังโหลดข้อมูล...</p>
        ) : userData ? (
          <>
            <img src={userData.profileImage || "/default-avatar.png"} alt="Profile" className="profile-img" />
            <p><strong>ชื่อ:</strong> {userData.fullName}</p>
            <p><strong>หน่วยงาน:</strong> {userData.agency}</p>
            <p><strong>อีเมล:</strong> {userData.email}</p>
            <p><strong>ตำแหน่ง:</strong> {userData.role}</p>
            <p><strong>Username:</strong> {userData.username}</p>
          </>
        ) : (
          <p>ไม่พบข้อมูลผู้ใช้</p>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
