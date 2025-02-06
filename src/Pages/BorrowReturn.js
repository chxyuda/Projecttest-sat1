import React, { useState } from "react";
import ITDashboard from "./ITDashboard";
import "./BorrowReturn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCheck, faTimes, faList, faClipboard, faPlus, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

const BorrowReturn = () => {
  const [selectedFilter, setSelectedFilter] = useState("pending");
  const [showAddModal, setShowAddModal] = useState(false);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <div>
      {/* ✅ Navbar และเมนูด้านบน */}
      <ITDashboard />

      <div className="borrow-return-container">
  {/* ✅ ปรับตำแหน่งหัวข้อ "ยืม/คืน" ให้ชิดซ้าย */}
  <h1 className="borrow-return-title">
    <FontAwesomeIcon icon={faSyncAlt} /> ยืม/คืน
  </h1>

        {/* ✅ กรอบปุ่ม */}
        <div className="borrow-return-buttons">
  <div className="borrow-return-buttons-container">
    <button className={selectedFilter === "pending" ? "active" : ""} onClick={() => handleFilterChange("pending")}>
      <FontAwesomeIcon icon={faClock} /> รออนุมัติ
    </button>
    <button className={selectedFilter === "approved" ? "active" : ""} onClick={() => handleFilterChange("approved")}>
      <FontAwesomeIcon icon={faCheck} /> อนุมัติแล้ว
    </button>
    <button className={selectedFilter === "rejected" ? "active" : ""} onClick={() => handleFilterChange("rejected")}>
      <FontAwesomeIcon icon={faTimes} /> ไม่อนุมัติ
    </button>
    <button className={selectedFilter === "borrow-return" ? "active" : ""} onClick={() => handleFilterChange("borrow-return")}>
      <FontAwesomeIcon icon={faList} /> รายการยืม-คืน
    </button>
    <button className={selectedFilter === "borrow-status" ? "active" : ""} onClick={() => handleFilterChange("borrow-status")}>
      <FontAwesomeIcon icon={faClipboard} /> สถานะยืม-คืน
    </button>
    <button className="add-btn" onClick={openAddModal}>
      <FontAwesomeIcon icon={faPlus} /> เพิ่ม
    </button>
  </div>
</div>

        {/* ✅ Modal สำหรับเพิ่มรายการ */}
        {showAddModal && <AddBorrowModal onClose={closeAddModal} />}
      </div>
    </div>
  );
};

// ✅ **ฟอร์ม Modal สำหรับเพิ่มข้อมูลใหม่**
const AddBorrowModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    department: "",
    item: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ เพิ่มรายการสำเร็จ!");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>เพิ่มรายการใหม่</h2>
        <form onSubmit={handleSubmit}>
          <label>ฝ่าย/สำนัก:</label>
          <input type="text" name="department" value={formData.department} onChange={handleChange} required />

          <label>อุปกรณ์:</label>
          <input type="text" name="item" value={formData.item} onChange={handleChange} required />

          <label>วันที่ยืม:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />

          <div className="modal-buttons">
            <button type="submit" className="save-btn">บันทึก</button>
            <button type="button" className="cancel-btn" onClick={onClose}>ยกเลิก</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BorrowReturn;
