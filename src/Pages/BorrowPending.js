import React, { useEffect, useState } from "react";
import ITDashboard from "./ITDashboard";
import "./BorrowReturn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt, faEye } from "@fortawesome/free-solid-svg-icons";

const BorrowPending = () => {
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <ITDashboard />
      <div className="borrow-return-container">
        <h1 className="borrow-return-title">
          <FontAwesomeIcon icon={faSyncAlt} /> รออนุมัติ
        </h1>

        <div className="borrow-return-list">
          {loading ? (
            <p>กำลังโหลดข้อมูล...</p>
          ) : pendingRequests.length === 0 ? (
            <p>ไม่มีรายการรออนุมัติ</p>
          ) : (
            <table className="borrow-return-table">
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
                        className="detail-button"
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
          <div className="modal-overlay">
            <div className="modal-content">
              <span className="modal-close" onClick={handleCloseDetails}>
                &times;
              </span>
              <h3>รายละเอียดคำขอ</h3>
              <p>ชื่อผู้ขอ: {selectedRequest.borrower_name}</p>
              <p>ฝ่าย/สำนัก: {selectedRequest.department}</p>
              <p>โทรศัพท์: {selectedRequest.phone}</p>
              <p>อีเมล: {selectedRequest.email}</p>
              <p>วัสดุ/รุ่น: {selectedRequest.material}</p>
              <p>ประเภท: {selectedRequest.type || "-"}</p>
              <p>อุปกรณ์: {selectedRequest.equipment}</p>
              <p>ยี่ห้อ: {selectedRequest.brand}</p>
              <p>จำนวน: {selectedRequest.quantity_requested}</p>
              <p>วันที่ขอ: {new Date(selectedRequest.request_date).toLocaleDateString("th-TH")}</p>
              <p>วันที่คืน: {selectedRequest.return_date ? new Date(selectedRequest.return_date).toLocaleDateString("th-TH") : "-"}</p>
              <p>หมายเหตุ: {selectedRequest.note || "-"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowPending;
