import React, { useState, useEffect } from "react";
import "./ProfileModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes, faUserShield, faLock, faPhone, faEnvelope,
  faBuilding, faFolderOpen, faTasks, faSave, faBan, faCamera, faUser
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ProfileModal = ({ onClose, userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData || {});
  const [imagePreview, setImagePreview] = useState(userData.image || null);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // State สำหรับ Dropdown
  const [departments, setDepartments] = useState([]);
  const [sections, setSections] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // โหลดข้อมูลฝ่าย
    axios.get("http://localhost:5001/api/departments")
      .then(response => setDepartments(response.data))
      .catch(error => console.error("Error fetching departments:", error));
  }, []);

  useEffect(() => {
    if (formData.department_id) {
      axios.get(`http://localhost:5001/api/sections/${formData.department_id}`)
        .then(response => setSections(response.data))
        .catch(error => console.error("Error fetching sections:", error));
    } else {
      setSections([]);
      setTasks([]);
    }
  }, [formData.department_id]);

  useEffect(() => {
    if (formData.section_id) {
      axios.get(`http://localhost:5001/api/tasks/${formData.section_id}`)
        .then(response => setTasks(response.data))
        .catch(error => console.error("Error fetching tasks:", error));
    } else {
      setTasks([]);
    }
  }, [formData.section_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "department_id" ? { section_id: "", task_id: "" } : {}),
      ...(name === "section_id" ? { task_id: "" } : {}),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      let imageUrl = formData.image;

      if (selectedFile) {
        const formDataImg = new FormData();
        formDataImg.append("image", selectedFile);
        const uploadResponse = await axios.post("http://localhost:5001/api/upload-profile", formDataImg, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        imageUrl = uploadResponse.data.imageUrl;
      }

      await axios.put("http://localhost:5001/api/update-profile", { ...formData, image: imageUrl });

      alert("✅ บันทึกข้อมูลสำเร็จ!");
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("❌ อัปเดตข้อมูลล้มเหลว:", error);
      alert("❌ ไม่สามารถบันทึกข้อมูลได้");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(userData);
    setImagePreview(userData.image || null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className="modal-title">โปรไฟล์</h2>

        {!isEditing ? (
          <ViewProfile userData={userData} setIsEditing={setIsEditing} />
        ) : (
          <EditProfile
            formData={formData}
            imagePreview={imagePreview}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
            departments={departments}
            sections={sections}
            tasks={tasks}
          />
        )}
      </div>
    </div>
  );
};

// ✅ แสดงโปรไฟล์
const ViewProfile = ({ userData, setIsEditing }) => (
  <>
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture">
          {userData.image ? (
            <img src={userData.image} alt="Profile" className="profile-image" />
          ) : (
            <div className="no-image">ไม่มีรูปภาพ</div>
          )}
        </div>
      </div>

      <div className="profile-card">
        <h3>ข้อมูลส่วนตัว</h3>
        <p><strong>ชื่อ - นามสกุล:</strong> {userData.fullName}</p>
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Password:</strong> <span className="password-hidden">*****</span></p>
        <p><strong>เบอร์โทร:</strong> {userData.phone}</p>
        <p><strong>อีเมล:</strong> {userData.email}</p>
      </div>

      <div className="profile-card">
        <h3>สังกัด</h3>
        <p><strong>ฝ่าย/สำนัก:</strong> {userData.department_name}</p>
        <p><strong>กอง:</strong> {userData.section_name}</p>
        <p><strong>งาน:</strong> {userData.task_name}</p>
      </div>

      <button className="edit-btn" onClick={() => setIsEditing(true)}>✏️ แก้ไขโปรไฟล์</button>
    </div>
  </>
);

// ✅ แก้ไขโปรไฟล์
const EditProfile = ({ formData, imagePreview, handleChange, handleFileChange, handleSave, handleCancel, departments, sections, tasks }) => (
  <>
    <div className="edit-profile">
      <h2>แก้ไขโปรไฟล์</h2>

      {/* 🔹 ชื่อ - นามสกุล */}
      <label>ชื่อ - นามสกุล:</label>
      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />

      {/* 🔹 Username */}
      <label>Username:</label>
      <input type="text" name="username" value={formData.username} onChange={handleChange} />

      {/* 🔹 Password */}
      <label>Password:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} />

      {/* 🔹 เบอร์โทร */}
      <label>เบอร์โทร:</label>
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} />

      {/* 🔹 อีเมล */}
      <label>อีเมล:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} />

      {/* 🔹 ฝ่าย/สำนัก */}
      <label>ฝ่าย/สำนัก:</label>
      <select name="department_id" value={formData.department_id} onChange={handleChange}>
        <option value="">เลือกฝ่าย/สำนัก</option>
        {departments.map(dept => (
          <option key={dept.id} value={dept.id}>{dept.name}</option>
        ))}
      </select>

      {/* 🔹 กอง */}
      <label>กอง:</label>
      <select name="section_id" value={formData.section_id} onChange={handleChange} disabled={!formData.department_id}>
        <option value="">เลือกกอง</option>
        {sections.map(section => (
          <option key={section.id} value={section.id}>{section.name}</option>
        ))}
      </select>

      {/* 🔹 งาน */}
      <label>งาน:</label>
      <select name="task_id" value={formData.task_id} onChange={handleChange} disabled={!formData.section_id}>
        <option value="">เลือกงาน</option>
        {tasks.map(task => (
          <option key={task.id} value={task.id}>{task.name}</option>
        ))}
      </select>

      {/* 🔹 ปุ่มบันทึกและยกเลิก */}
      <div className="buttons">
        <button className="save-btn" onClick={handleSave}>บันทึก</button>
        <button className="cancel-btn" onClick={handleCancel}>ยกเลิก</button>
      </div>
    </div>
  </>
);


export default ProfileModal;
