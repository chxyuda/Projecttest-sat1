import React, { useEffect, useState } from "react";
import ITDashboard from "./ITDashboard";
import "./BorrowApproved.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt, faEye, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const BorrowApproved = () => {
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [receiverName, setReceiverName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/borrow-requests");
      const data = await response.json();
      setBorrowRequests(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching borrow requests:", error);
      setLoading(false);
    }
  };

  

  const approvedRequests = borrowRequests.filter(
    (request) => request.status === "Approved"
  );

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setReceiverName("");
  };

  const handleCloseDetails = () => {
    setSelectedRequest(null);
    setReceiverName("");
  };

  const handleReceiveConfirm = async () => {
    if (!receiverName.trim()) {
      alert("กรุณากรอกชื่อผู้รับของ");
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:5001/api/borrow-requests/${selectedRequest.id}/receive`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            received_by: receiverName,
            date_received: new Date().toISOString().split('T')[0],
          }),
        }
      );
  
      if (response.ok) {
        alert("บันทึกการรับของสำเร็จ");
        handleCloseDetails();
        fetchData(); // อัปเดตข้อมูลใหม่
      } else {
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error("Error updating receive status:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
  };
  
  return (
    <div>
      <ITDashboard />
      <div className="borrow-approved-container">
  <h1 className="borrow-approved-title">
    <FontAwesomeIcon icon={faSyncAlt} /> อนุมัติแล้ว
  </h1>

  <div className="borrow-approved-list">
    {loading ? (
      <p>กำลังโหลดข้อมูล...</p>
    ) : (
      <table className="borrow-approved-table">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>ชื่อผู้ยืม</th>
            <th>ฝ่าย/สำนัก</th>
            <th>อุปกรณ์</th>
            <th>วันที่ยืม</th>
            <th>จำนวน</th>
            <th>ดูรายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {approvedRequests.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>ไม่มีรายการที่อนุมัติแล้ว</td>
            </tr>
          ) : (
            approvedRequests.map((req, index) => (
              <tr key={req.id}>
                <td>{index + 1}</td>
                <td>{req.borrower_name}</td>
                <td>{req.department}</td>
                <td>{req.equipment}</td>
                <td>{new Date(req.request_date).toLocaleDateString("th-TH")}</td>
                <td>{req.quantity_requested}</td>
                <td>
                  <button
                    className="borrow-approved-detail-button"
                    onClick={() => handleViewDetails(req)}
                  >
                    <FontAwesomeIcon icon={faEye} /> ดูรายละเอียด
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    )}
  </div>
</div>
        {selectedRequest && (
  <div className="borrow-approved-modal-overlay">
    <div className="borrow-approved-modal-content">
      <span className="borrow-approved-modal-close" onClick={handleCloseDetails}>
        &times;
      </span>
      <h3>รายละเอียดคำขอ</h3>

      <div className="borrow-approved-form-grid">
        <div className="borrow-approved-form-group">
          <label>ชื่อผู้ขอ:</label>
          <input type="text" value={selectedRequest.borrower_name} readOnly />
        </div>
        <div className="borrow-approved-form-group">
          <label>ฝ่าย/สำนัก:</label>
          <input type="text" value={selectedRequest.department} readOnly />
        </div>
        <div className="borrow-approved-form-group">
          <label>โทรศัพท์:</label>
          <input type="text" value={selectedRequest.phone} readOnly />
        </div>
        <div className="borrow-approved-form-group">
          <label>อีเมล:</label>
          <input type="text" value={selectedRequest.email} readOnly />
        </div>
        <div className="borrow-approved-form-group">
          <label>วัสดุ/รุ่น:</label>
          <input type="text" value={selectedRequest.material} readOnly />
        </div>
        <div className="borrow-approved-form-group">
          <label>ประเภท:</label>
          <input type="text" value={selectedRequest.type || "-"} readOnly />
        </div>
        <div className="borrow-approved-form-group">
          <label>อุปกรณ์:</label>
          <input type="text" value={selectedRequest.equipment} readOnly />
        </div>
        <div className="borrow-approved-form-group">
          <label>ยี่ห้อ:</label>
          <input type="text" value={selectedRequest.brand} readOnly />
        </div>
        <div className="borrow-approved-form-group">
          <label>จำนวน:</label>
          <input type="text" value={selectedRequest.quantity_requested} readOnly />
        </div>
        <div className="borrow-approved-form-group">
          <label>วันที่ขอ:</label>
          <input
            type="text"
            value={new Date(selectedRequest.request_date).toLocaleDateString("th-TH")}
            readOnly
          />
        </div>
        <div className="borrow-approved-form-group">
          <label>วันที่คืน:</label>
          <input
            type="text"
            value={
              selectedRequest.return_date
                ? new Date(selectedRequest.return_date).toLocaleDateString("th-TH")
                : "-"
            }
            readOnly
          />
        </div>
        <div className="borrow-approved-form-group">
          <label>หมายเหตุ:</label>
          <input type="text" value={selectedRequest.note || "-"} readOnly />
        </div>
      </div>

      {/* ส่วนรับของ */}
      <div className="receive-section">
        <label>ชื่อผู้รับของ:</label>
        <input
          type="text"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
        />
        <button className="confirm-receive-button" onClick={handleReceiveConfirm}>
          ยืนยันการรับของ
        </button>
      </div>
    </div>
  </div>
)}
        <div className="borrow-approved-footer">
          <button className="borrow-approved-back-button" onClick={() => navigate(-1)}>
            ย้อนกลับ
          </button>
        </div>
      </div>
  );
};

export default BorrowApproved;
