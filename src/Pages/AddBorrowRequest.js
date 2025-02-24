import React, { useState } from "react";
import "./AddBorrowRequest.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // นำเข้า icon กากบาท

const AddBorrowRequest = ({ onClose, onSubmit }) => {
  const [newRequest, setNewRequest] = useState({
    borrower_name: "",
    department: "",
    phone: "",
    email: "",
    material: "",
    type: "",
    equipment: "",
    brand: "",
    quantity: 1,
    request_date: "",
    return_date: "",
    note: "",
    status: "Pending",
  });

  const handleSubmit = () => {
    if (!newRequest.borrower_name || !newRequest.equipment || !newRequest.request_date) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    onSubmit(newRequest);
    onClose();
  };

  return (
    <div className="add-borrow-overlay">
      <div className="add-borrow-modal">
        
        {/* ปุ่มกากบาท ปิด Modal */}
        <button className="add-borrow-close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h3 className="add-borrow-title">เพิ่มรายการยืม/คืน</h3>

        <label className="add-borrow-label">ชื่อผู้ขอ:</label>
        <input className="add-borrow-input" type="text" value={newRequest.borrower_name} 
          onChange={(e) => setNewRequest({ ...newRequest, borrower_name: e.target.value })} />

        <label className="add-borrow-label">ฝ่าย/สำนัก:</label>
        <input className="add-borrow-input" type="text" value={newRequest.department} 
          onChange={(e) => setNewRequest({ ...newRequest, department: e.target.value })} />

        <label className="add-borrow-label">โทรศัพท์:</label>
        <input className="add-borrow-input" type="text" value={newRequest.phone} 
          onChange={(e) => setNewRequest({ ...newRequest, phone: e.target.value })} />

        <label className="add-borrow-label">อีเมล:</label>
        <input className="add-borrow-input" type="email" value={newRequest.email} 
          onChange={(e) => setNewRequest({ ...newRequest, email: e.target.value })} />

        <label className="add-borrow-label">วัสดุ/รุ่น:</label>
        <input className="add-borrow-input" type="text" value={newRequest.material} 
          onChange={(e) => setNewRequest({ ...newRequest, material: e.target.value })} />

        <label className="add-borrow-label">ประเภท:</label>
        <input className="add-borrow-input" type="text" value={newRequest.type} 
          onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })} />

        <label className="add-borrow-label">อุปกรณ์:</label>
        <input className="add-borrow-input" type="text" value={newRequest.equipment} 
          onChange={(e) => setNewRequest({ ...newRequest, equipment: e.target.value })} />

        <label className="add-borrow-label">ยี่ห้อ:</label>
        <input className="add-borrow-input" type="text" value={newRequest.brand} 
          onChange={(e) => setNewRequest({ ...newRequest, brand: e.target.value })} />

        <label className="add-borrow-label">จำนวน:</label>
        <input className="add-borrow-input" type="number" min="1" value={newRequest.quantity} 
          onChange={(e) => setNewRequest({ ...newRequest, quantity: e.target.value })} />

        <label className="add-borrow-label">วันที่ขอ:</label>
        <input className="add-borrow-input" type="date" value={newRequest.request_date} 
          onChange={(e) => setNewRequest({ ...newRequest, request_date: e.target.value })} />

        <label className="add-borrow-label">วันที่คืน:</label>
        <input className="add-borrow-input" type="date" value={newRequest.return_date} 
          onChange={(e) => setNewRequest({ ...newRequest, return_date: e.target.value })} />

        <label className="add-borrow-label">หมายเหตุ:</label>
        <textarea className="add-borrow-textarea" value={newRequest.note} 
          onChange={(e) => setNewRequest({ ...newRequest, note: e.target.value })} />

        <div className="add-borrow-buttons">
          <button className="add-borrow-confirm" onClick={handleSubmit}>บันทึก</button>
        </div>
      </div>
    </div>
  );
};

export default AddBorrowRequest;
