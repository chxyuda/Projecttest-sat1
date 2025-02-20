import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ITDashboard from "./ITDashboard";
import "./BorrowPending.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt, faEye } from "@fortawesome/free-solid-svg-icons";

const BorrowPending = () => {
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchData();
  }, []);

  const pendingRequests = borrowRequests.filter(
    (request) => request.status === "Pending"
  );

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseDetails = () => {
    setSelectedRequest(null);
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div>
      <ITDashboard />
      <div className="borrow-pending-container">
        <h1 className="borrow-pending-title">
          <FontAwesomeIcon icon={faSyncAlt} /> รออนุมัติ
        </h1>

        <div className="borrow-pending-list">
          {loading ? (
            <p>กำลังโหลดข้อมูล...</p>
          ) : pendingRequests.length === 0 ? (
            <p>ไม่มีรายการรออนุมัติ</p>
          ) : (
            <table className="borrow-pending-table">
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
                {pendingRequests.map((req, index) => (
                  <tr key={req.id}>
                    <td>{index + 1}</td>
                    <td>{req.borrower_name}</td>
                    <td>{req.department}</td>
                    <td>{req.equipment}</td>
                    <td>{new Date(req.request_date).toLocaleDateString("th-TH")}</td>
                    <td>{req.quantity_requested}</td>
                    <td>
                      <button
                        className="borrow-pending-detail-button"
                        onClick={() => handleViewDetails(req)}
                      >
                        <FontAwesomeIcon icon={faEye} /> ดูรายละเอียด
                      </button>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal ดูรายละเอียด */}
        {selectedRequest && (
  <div className="borrow-pending-modal-overlay">
    <div className="borrow-pending-modal-content">
      <span className="borrow-pending-modal-close" onClick={handleCloseDetails}>
        &times;
      </span>
      <h3>รายละเอียดคำขอ</h3>

      <div className="borrow-pending-modal-form">
        <div className="borrow-pending-form-group">
          <label>ชื่อผู้ขอ:</label>
          <input type="text" value={selectedRequest.borrower_name} readOnly />
        </div>

        <div className="borrow-pending-form-group">
          <label>ฝ่าย/สำนัก:</label>
          <input type="text" value={selectedRequest.department} readOnly />
        </div>

        <div className="borrow-pending-form-group">
          <label>โทรศัพท์:</label>
          <input type="text" value={selectedRequest.phone} readOnly />
        </div>

        <div className="borrow-pending-form-group">
          <label>อีเมล:</label>
          <input type="text" value={selectedRequest.email} readOnly />
        </div>

        <div className="borrow-pending-form-group">
          <label>ชื่อ:</label>
          <input type="text" value={selectedRequest.material} readOnly />
        </div>

        <div className="borrow-pending-form-group">
          <label>ประเภท:</label>
          <input type="text" value={selectedRequest.type || "-"} readOnly />
        </div>

        <div className="borrow-pending-form-group">
          <label>อุปกรณ์:</label>
          <input type="text" value={selectedRequest.equipment} readOnly />
        </div>

        <div className="borrow-pending-form-group">
          <label>ยี่ห้อ:</label>
          <input type="text" value={selectedRequest.brand} readOnly />
        </div>

        <div className="borrow-pending-form-group">
          <label>จำนวน:</label>
          <input type="text" value={selectedRequest.quantity_requested} readOnly />
        </div>

        <div className="borrow-pending-form-group">
          <label>วันที่ขอ:</label>
          <input
            type="text"
            value={new Date(selectedRequest.request_date).toLocaleDateString("th-TH")}
            readOnly
          />
        </div>

        <div className="borrow-pending-form-group">
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

        <div className="borrow-pending-form-group">
          <label>หมายเหตุ:</label>
          <textarea value={selectedRequest.note || "-"} readOnly />
        </div>
      </div>
    </div>
  </div>
)}
        {/* ปุ่มย้อนกลับอยู่ตรงนี้ */}
<div className="borrow-pending-footer">
  <button className="borrow-pending-back-button" onClick={() => navigate(-1)}>
    ย้อนกลับ
  </button>
</div>
      </div>
    </div>
  );
};

export default BorrowPending;
